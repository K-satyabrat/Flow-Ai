
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FlowProvider } from "./contexts/FlowContext.jsx";

createRoot(document.getElementById('root')).render(
   <FlowProvider>
      <App />
    </FlowProvider>
)
