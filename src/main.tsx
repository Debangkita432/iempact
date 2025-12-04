import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Add error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error('Failed to render React app:', error);
  rootElement.innerHTML = `
    <div style="color: white; padding: 40px; font-family: Arial, sans-serif; background: #0d0d0d; min-height: 100vh;">
      <h1 style="color: #ff0000;">Error Loading Application</h1>
      <pre style="color: #ffffff; margin-top: 20px;">${error instanceof Error ? error.message : String(error)}</pre>
      <p style="margin-top: 20px;">Check the browser console (F12) for more details.</p>
    </div>
  `;
}
