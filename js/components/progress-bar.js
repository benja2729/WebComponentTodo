import { getTemplate } from '../utils/template.js';

export default class ProgressBar extends HTMLElement {
  static get observedAttributes() {
    return ['complete'];
  }

  static get templateSelector() {
    return 'template#progress-bar__template';
  }

  static get templateNode() {
    const selector = this.templateSelector;
    if (typeof selector === 'string') {
      return getTemplate(selector);
    }
    return document.createElement('div');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'complete':
        const width = parseInt(newValue, 10);
        this.updateProgress(width);
        break;
      default:
        throw `No way to update attr['${name}']`;
    }
  }

  get complete() {
    return this.getAttribute('complete') || 0;
  }

  set complete(value) {
    this.setAttribute('complete', value);
  }

  get innerBar() {
    return this.shadowRoot.querySelector('.progress-bar__inner');
  }

  connectedCallback() {
    this._render();
    this.updateProgress(this.complete);
  }

  _render() {
    const template = this.constructor.templateNode;
    this.shadowRoot.appendChild(template, true);
  }

  updateProgress(width) {
    const { innerBar } = this;
    if (innerBar) {
      innerBar.style.width = `${width}%`;
      innerBar.textContent = width > 0 ? `${width}%` : '';
      this.dispatchEvent(new CustomEvent('progress-bar.progress', { detail: width }));
    }
  }
}

window.customElements.define('progress-bar', ProgressBar);
