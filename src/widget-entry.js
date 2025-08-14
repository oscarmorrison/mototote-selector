import React from 'react'
import { createRoot } from 'react-dom/client'
import Widget from './Widget.jsx'

// Inline CSS styles
const CSS_STYLES = `
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
}

h2 {
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: block;
}

#mototote-widget select,
[data-mototote-initialized] select,
.mototote-widget select,
div[data-mototote-initialized="true"] select {
  box-sizing: border-box !important;
  width: 100% !important;
  height: 54px !important;
  padding: 13px 20px !important;
  border: 1px solid #d3d3d3 !important;
  border-radius: 30px !important;
  background: #fff !important;
  color: #000 !important;
  font-family: Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 26px !important;
  -webkit-font-smoothing: antialiased;
  margin-bottom: 1rem !important;
  transition: border-color 0.3s !important;
  cursor: pointer !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
}

#mototote-widget select:hover,
#mototote-widget select:focus,
[data-mototote-initialized] select:hover,
[data-mototote-initialized] select:focus,
.mototote-widget select:hover,
.mototote-widget select:focus,
div[data-mototote-initialized="true"] select:hover,
div[data-mototote-initialized="true"] select:focus {
  border-color: #cc0000 !important;
  outline: none !important;
}

#mototote-widget input[type="text"],
#mototote-widget input[type="number"],
[data-mototote-initialized] input[type="text"],
[data-mototote-initialized] input[type="number"],
.mototote-widget input[type="text"],
.mototote-widget input[type="number"],
div[data-mototote-initialized="true"] input[type="text"],
div[data-mototote-initialized="true"] input[type="number"] {
  box-sizing: border-box !important;
  width: 100% !important;
  height: 54px !important;
  padding: 13px 20px !important;
  border: 1px solid #d3d3d3 !important;
  border-radius: 30px !important;
  background: #fff !important;
  color: #000 !important;
  font-family: Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 26px !important;
  -webkit-font-smoothing: antialiased;
  caret-color: #000 !important;
  margin-bottom: 1rem !important;
  transition: border-color 0.3s !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
}

#mototote-widget input[type="text"]:hover,
#mototote-widget input[type="text"]:focus,
#mototote-widget input[type="number"]:hover,
#mototote-widget input[type="number"]:focus,
[data-mototote-initialized] input[type="text"]:hover,
[data-mototote-initialized] input[type="text"]:focus,
[data-mototote-initialized] input[type="number"]:hover,
[data-mototote-initialized] input[type="number"]:focus,
.mototote-widget input[type="text"]:hover,
.mototote-widget input[type="text"]:focus,
.mototote-widget input[type="number"]:hover,
.mototote-widget input[type="number"]:focus {
  border-color: #cc0000 !important;
  outline: none !important;
}

/* Remove number spinners */
#mototote-widget input[type="number"],
[data-mototote-initialized] input[type="number"],
.mototote-widget input[type="number"] {
  -moz-appearance: textfield !important;
}
#mototote-widget input[type="number"]::-webkit-outer-spin-button,
#mototote-widget input[type="number"]::-webkit-inner-spin-button,
[data-mototote-initialized] input[type="number"]::-webkit-outer-spin-button,
[data-mototote-initialized] input[type="number"]::-webkit-inner-spin-button,
.mototote-widget input[type="number"]::-webkit-outer-spin-button,
.mototote-widget input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

#mototote-widget button,
[data-mototote-initialized] button,
.mototote-widget button {
  font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif !important;
  font-size: 1rem !important;
  color: #fff !important;
  background: #cc0000 !important;
  border-radius: 30px !important;
  border: none !important;
  padding: 10px 18px !important;
  cursor: pointer !important;
  margin-top: 1rem !important;
  width: 100% !important;
  transition: background-color 0.3s !important;
}

#mototote-widget button:hover,
[data-mototote-initialized] button:hover,
.mototote-widget button:hover {
  background: #000 !important;
  color: #fff !important;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.select-button-container {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}

#mototote-widget .select-button,
[data-mototote-initialized] .select-button,
.mototote-widget .select-button {
  font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif !important;
  font-size: 1rem !important;
  color: #fff !important;
  background: #cc0000 !important;
  border-radius: 30px !important;
  border: none !important;
  padding: 10px 18px !important;
  cursor: pointer !important;
  transition: background-color 0.3s ease !important;
}

#mototote-widget .select-button:hover,
[data-mototote-initialized] .select-button:hover,
.mototote-widget .select-button:hover {
  background: #000 !important;
  color: #fff !important;
}

.vehicle-summary {
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.towing-details {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}

.motorcycle-details {
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.motorcycle-details ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.motorcycle-details li {
  margin: 0.5rem 0;
}

.carrier-selector {
  text-align: center;
  margin: 2rem 0;
}

.carrier-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.carrier-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carrier-image {
  flex: 0 0 200px;
  display: flex;
  align-items: center;
}

.carrier-image img {
  max-width: 100%;
  height: auto;
}

.carrier-details {
  flex: 1;
}

.carrier-item h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.carrier-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.carrier-item li {
  margin: 0.25rem 0;
}

#mototote-widget .carrier-item a,
[data-mototote-initialized] .carrier-item a,
.mototote-widget .carrier-item a {
  display: inline-block !important;
  margin-top: 0.5rem !important;
  font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif !important;
  font-size: 1rem !important;
  color: #fff !important;
  background: #cc0000 !important;
  border-radius: 30px !important;
  border: none !important;
  padding: 10px 18px !important;
  text-decoration: none !important;
  transition: background-color 0.3s !important;
}

#mototote-widget .carrier-item a:hover,
[data-mototote-initialized] .carrier-item a:hover,
.mototote-widget .carrier-item a:hover {
  background: #000 !important;
  color: #fff !important;
}

.helper-text {
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
  margin-top: 0.25rem;
}

.mototote-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif;
  color: #666;
  font-size: 1rem;
}
`

// Function to inject CSS into the page
const injectCSS = () => {
  const cssId = 'mototote-widget-styles'
  if (document.getElementById(cssId)) return // Already injected

  const style = document.createElement('style')
  style.id = cssId
  style.textContent = CSS_STYLES
  document.head.appendChild(style)

  // Debug: log that CSS was injected
  console.log('MotoTote Widget: CSS injected')
}

const WIDGET_BASE_URL = 'https://oscarmorrison.com/mototote-selector/'

// Simple loading component
const LoadingComponent = () => {
  return React.createElement('div', {
    className: 'mototote-loading'
  }, 'Loading MotoTote Widget...')
}

const MotoToteWidget = {
  init: function(containerId, options = {}) {
    // Inject CSS first
    injectCSS()

    const container = typeof containerId === 'string'
      ? document.getElementById(containerId)
      : containerId

    if (!container) {
      console.error(`MotoTote Widget: Container with id "${containerId}" not found`)
      return null
    }

    if (container.dataset.motototeInitialized) {
      console.warn('MotoTote Widget: Container already initialized')
      return null
    }

    const config = {
      baseUrl: options.baseUrl || WIDGET_BASE_URL,
      theme: options.theme || 'default',
      ...options
    }

    window.MOTOTOTE_CONFIG = config

    const root = createRoot(container)

    // Show loading state first
    root.render(React.createElement(LoadingComponent))

    // Load the actual widget after a brief moment
    setTimeout(() => {
      root.render(React.createElement(Widget))
    }, 200)

    container.dataset.motototeInitialized = 'true'

    return {
      container,
      root,
      destroy: () => {
        root.unmount()
        delete container.dataset.motototeInitialized
      }
    }
  },

  initAll: function(options = {}) {
    const containers = document.querySelectorAll('[id="mototote-widget"], .mototote-widget')
    const instances = []

    containers.forEach(container => {
      const instance = this.init(container, options)
      if (instance) {
        instances.push(instance)
      }
    })

    return instances
  }
}

if (typeof window !== 'undefined') {
  window.MotoToteWidget = MotoToteWidget

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      MotoToteWidget.initAll()
    })
  } else {
    MotoToteWidget.initAll()
  }
}

export default MotoToteWidget
