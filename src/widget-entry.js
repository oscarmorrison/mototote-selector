import React from 'react'
import { createRoot } from 'react-dom/client'
import Widget from './Widget.jsx'
import './Widget.css'

const WIDGET_BASE_URL = 'https://oscarmorrison.com/mototote-selector/'

const MotoToteWidget = {
  init: function(containerId, options = {}) {
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
    root.render(React.createElement(Widget))

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
