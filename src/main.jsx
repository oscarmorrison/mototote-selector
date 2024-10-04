import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import register from 'react-web-component'
import Widget from './Widget.jsx'

register(Widget, 'mototote-widget')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Widget />
  </StrictMode>,
)
