
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set default theme to dark
if (!document.documentElement.classList.contains('dark')) {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for offline/online support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err => {
      console.error('Service worker registration failed:', err);
    });
  });
}
