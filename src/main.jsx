import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// PWA: offline shell + "Add to Home Screen" installability
if ('serviceWorker' in navigator && !location.hostname.includes('localhost')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  window.__installPrompt = e
  window.dispatchEvent(new Event('thodasa:installable'))
})
