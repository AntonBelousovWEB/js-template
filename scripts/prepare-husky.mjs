import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

async function main() {
	try {
		await access(resolve(process.cwd(), '.git'))
		await new Promise((resolveProcess, rejectProcess) => {
			const child = spawn('npx', ['husky'], { stdio: 'inherit', shell: true })

			child.on('error', rejectProcess)
			child.on('exit', (code) => {
				if (code === 0) {
					resolveProcess()
					return
				}

				rejectProcess(new Error(`husky exited with code ${code}`))
			})
		})
	}
	catch (error) {
		if (error?.code !== 'ENOENT') {
			throw error
		}
	}
}

main()
