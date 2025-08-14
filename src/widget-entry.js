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

select {
  box-sizing: border-box;
  width: 100%;
  height: 54px;
  padding: 13px 20px;
  border: 1px solid #d3d3d3;
  border-radius: 30px;
  background: #fff;
  color: #000;
  font: 400 16px/26px Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif;
  -webkit-font-smoothing: antialiased;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
  cursor: pointer;
}

select:hover,
select:focus {
  border-color: #cc0000;
  outline: none;
}

input[type="text"],
input[type="number"] {
  box-sizing: border-box;
  width: 100%;
  height: 54px;
  padding: 13px 20px;
  border: 1px solid #d3d3d3;
  border-radius: 30px;
  background: #fff;
  color: #000;
  font: 400 16px/26px Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif;
  -webkit-font-smoothing: antialiased;
  caret-color: #000;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
}

input[type="text"]:hover,
input[type="text"]:focus,
input[type="number"]:hover,
input[type="number"]:focus {
  border-color: #cc0000;
  outline: none;
}

/* Remove number spinners */
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

button {
  font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  color: #fff;
  background: #cc0000;
  border-radius: 30px;
  border: none;
  padding: 10px 18px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  transition: background-color 0.3s;
}

button:hover {
  background: #000;
  color: #fff;
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

.select-button {
  font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  color: #fff;
  background: #cc0000;
  border-radius: 30px;
  border: none;
  padding: 10px 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.select-button:hover {
  background: #000;
  color: #fff;
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

.carrier-item a {
  display: inline-block;
  margin-top: 0.5rem;
  font-family: Helvetica, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  color: #fff;
  background: #cc0000;
  border-radius: 30px;
  border: none;
  padding: 10px 18px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.carrier-item a:hover {
  background: #000;
  color: #fff;
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
