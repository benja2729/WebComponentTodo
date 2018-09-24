import AppElement from './app-element.js';

export default class TaskApp extends AppElement {
  static get is() { return 'task-app' }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get taskList() {
    return this.shadowRoot.querySelector('task-list');
  }

  attachListeners() {
    this.receive('task-form.submit', (detail) => {
      const list = this.taskList;
      const tasks = list.tasks.concat(detail);
      list.tasks = tasks;
    });
  }
}

window.customElements.define(TaskApp.is, TaskApp);
