import AppElement from './app-element.js';

export default class TaskForm extends AppElement {
  static get is() { return 'task-form' }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get inputNode() {
    return this.shadowRoot.querySelector('input');
  }

  get buttonNode() {
    return this.shadowRoot.querySelector('button');
  }

  attachListeners() {
    this.listenFor('click', (event) => {
      if (event.target === this.buttonNode) {
        const input = this.inputNode;
        this.send('submit', input.value);
        input.value = '';
      }
    })
  }
}

window.customElements.define(TaskForm.is, TaskForm);
