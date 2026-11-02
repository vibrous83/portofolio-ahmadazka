import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import App from './app.jsx'

const particlesInit = async (engine) => {
  await loadSlim(engine)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ParticlesProvider init={particlesInit}>
      <App />
    </ParticlesProvider>
  </StrictMode>
)