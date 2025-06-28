import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'highlight.js/styles/nord.css'; // ✅ Theme CSS
import 'remixicon/fonts/remixicon.css'

createRoot(document.getElementById('root')).render(
  
    <App />
 
)
