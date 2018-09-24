import { renderTemplate } from '../utils/template.js';

export default class AppElement extends HTMLElement {
  constructor() {
    super();
    if (typeof this.constructor.is !== 'string') {
      throw new Error('AppElement static property "is" required');
    }
  }

  connectedCallback() {
    renderTemplate(this, this.constructor.is);
    this.attachListeners();
  }

  attachListeners() {}

  listenFor(eventName, callback) {
    if (this.shadowRoot) {
      this.shadowRoot.addEventListener(eventName, callback);
    } else {
      this.addEventListener(eventName, callback);
    }
  }

  send(action, detail) {
    const actionName = `${this.constructor.is}.${action}`;
    const event = new CustomEvent(actionName, {
      bubbles: true,
      detail
    });
    this.dispatchEvent(event);
  }
  
  receive(action, callback) {
    this.listenFor(action, (event) => {
      event.stopPropagation();
      callback.call(this, event.detail);
    });
  }
} 
