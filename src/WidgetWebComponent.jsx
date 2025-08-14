import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './Widget.jsx';
import { widgetStyles } from './widget-styles.js';

class MotoToteWidget extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'block';
    this.style.fontFamily = 'Helvetica, "Helvetica Neue", Arial, "Lucida Grande", sans-serif';
    this.style.maxWidth = '1280px';
    this.style.margin = '0 auto';
    this.style.padding = '2rem';
    this.style.textAlign = 'center';
  }

  connectedCallback() {
    // Inject styles
    if (!document.getElementById('mototote-widget-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'mototote-widget-styles';
      styleElement.textContent = widgetStyles;
      document.head.appendChild(styleElement);
    }

    const container = document.createElement('div');
    container.id = 'mototote-widget-root';
    this.appendChild(container);

    const root = createRoot(container);
    root.render(<Widget />);
  }
}

// Register the custom element with error handling
if (typeof window !== 'undefined' && window.customElements) {
  try {
    if (!customElements.get('mototote-widget')) {
      customElements.define('mototote-widget', MotoToteWidget);
      console.log('MotoTote Widget registered successfully');
    }
  } catch (error) {
    console.warn('Failed to register custom element:', error);

    // Fallback: create a simple div-based widget
    window.createMotoToteWidget = function(containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        const root = createRoot(container);
        root.render(<Widget />);
      }
    };
  }
}

export default MotoToteWidget;
