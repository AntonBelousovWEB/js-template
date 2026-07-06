import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createServer as createViteServer } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT || 5173)

const mimeTypes = {
	'.css': 'text/css',
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.map': 'application/json',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
}

async function createViteDevServer() {
	if (!isProduction) {
		return createViteServer({
			server: { middlewareMode: true },
			appType: 'custom',
		})
	}

	return null
}

async function readTemplate(url, vite) {
	if (!isProduction) {
		const template = await readFile(resolve(__dirname, 'index.html'), 'utf-8')
		return vite.transformIndexHtml(url, template)
	}

	return readFile(resolve(__dirname, 'dist/client/index.html'), 'utf-8')
}

async function loadRenderer(vite) {
	if (!isProduction) {
		return vite.ssrLoadModule('/src/entry-server.tsx')
	}

	return import(pathToFileURL(resolve(__dirname, 'dist/server/entry-server.js')))
}

async function serveAsset(request, response) {
	if (!isProduction || !request.url)
		return false

	const pathname = new URL(request.url, 'http://localhost').pathname
	const filePath = resolve(__dirname, `dist/client${pathname}`)

	if (!filePath.startsWith(resolve(__dirname, 'dist/client')))
		return false

	try {
		const body = await readFile(filePath)
		response.writeHead(200, {
			'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream',
		})
		response.end(body)
		return true
	}
	catch {
		return false
	}
}

async function main() {
	const vite = await createViteDevServer()

	createServer(async (request, response) => {
		try {
			if (vite) {
				await new Promise((resolve, reject) => {
					vite.middlewares(request, response, (err) => {
						if (err) reject(err)
						else resolve()
					})
				})
				if (response.writableEnded) return
			}

			if (await serveAsset(request, response))
				return

			const url = request.url || '/'

			const pathname = new URL(url, 'http://localhost').pathname
			if (pathname.startsWith('/.well-known/')) {
				response.writeHead(404, { 'Content-Type': 'text/plain' })
				response.end('Not Found')
				return
			}

			const template = await readTemplate(url, vite)
			const { render } = await loadRenderer(vite)
			const rendered = await render(url)

			if (rendered instanceof Response) {
				response.writeHead(rendered.status, Object.fromEntries(rendered.headers))
				response.end(await rendered.text())
				return
			}

			const html = template.replace('<!--ssr-outlet-->', rendered.html)

			response.writeHead(rendered.statusCode, {
				'Content-Type': 'text/html',
				...rendered.headers,
			})
			response.end(html)
		}
		catch (error) {
			vite?.ssrFixStacktrace(error)
			console.error(error)
			response.writeHead(500, { 'Content-Type': 'text/plain' })
			response.end('Internal Server Error')
		}
	}).listen(port, () => {
		console.log(`SSR server is running at http://localhost:${port}`)
	})
}

main()
