// --- CRITICAL ERROR CATCHER (MUST BE FIRST) ---
window.addEventListener('error', (event) => {
  console.error('[RUNTIME ERROR]', event.error);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding: 40px; color: white; background: #121212; height: 100vh; font-family: monospace; overflow: auto; border-top: 4px solid #D32F2F;">
      <h1 style="color: #D32F2F; margin-bottom: 20px; font-size: 24px;">SISTEM ERROR (RUNTIME)</h1>
      <div style="background: rgba(211, 47, 47, 0.1); padding: 20px; border-radius: 8px; border: 1px solid rgba(211, 47, 47, 0.2);">
        <p style="font-weight: bold; margin-bottom: 10px;">${event.error?.message || 'Unknown Error'}</p>
        <pre style="font-size: 11px; color: #aaa; background: #000; padding: 15px; border-radius: 4px; border: 1px solid #333; overflow-x: auto;">${event.error?.stack || 'No stack trace available'}</pre>
      </div>
      <div style="margin-top: 20px;">
        <button onclick="window.location.reload()" style="background: #D32F2F; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold;">
          Cuba Lagi / Muat Semula
        </button>
      </div>
      <p style="margin-top: 20px; font-size: 10px; color: #555; text-transform: uppercase;">MNF NEURAL ENGINE V7.5</p>
    </div>`;
  }
});

// --- CRITICAL BROWSER SHIMS ---
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('[SYSTEM] Initializing App Core...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("[SYSTEM] CRITICAL: Could not find root element to mount to!");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('[SYSTEM] App Rendered Successfully.');
} catch (error) {
  console.error('[SYSTEM] CRITICAL Error during render:', error);
}
