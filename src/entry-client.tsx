import { hydrateRoot } from 'react-dom/client'
import { App } from './app/app.component'
import { createAppContainer } from './app/container/container'
import { setupRouter } from './app/setupRouter'
import '@mantine/core/styles.css'
import './index.css'

const container = createAppContainer()
const router = setupRouter()
const root = document.getElementById('root')

if (!root) {
	throw new Error('Root element #root was not found.')
}

hydrateRoot(root, <App container={container} router={router} />)
