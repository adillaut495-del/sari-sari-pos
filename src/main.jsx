import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  }).catch(() => {
    // Ignore unregister errors; the app should still load without stale service workers.
  });
}

createRoot(document.getElementById('root')).render(<App />)
