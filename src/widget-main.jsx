import './WidgetWebComponent.jsx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './Widget.jsx';
import { widgetStyles } from './widget-styles.js';

// Inject styles globally
if (typeof document !== 'undefined') {
    if (!document.getElementById('mototote-widget-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'mototote-widget-styles';
        styleElement.textContent = widgetStyles;
        document.head.appendChild(styleElement);
    }
}

// Fallback function for when custom elements don't work
window.initMotoToteWidget = function(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        const root = createRoot(container);
        root.render(<Widget />);
        console.log('MotoTote Widget initialized in container:', containerId);
    } else {
        console.error('Container not found:', containerId);
    }
};

// Auto-initialize if there's a container with the right ID
if (typeof document !== 'undefined') {
    const autoContainer = document.getElementById('mototote-widget-container');
    if (autoContainer) {
        window.initMotoToteWidget('mototote-widget-container');
    }
}

console.log('MotoTote Widget loaded successfully!');
console.log('Use <mototote-widget></mototote-widget> to embed the widget in your page.');
console.log('Or use <div id="mototote-widget-container"></div> and call initMotoToteWidget("mototote-widget-container")');
