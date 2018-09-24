import AppElement from './app-element.js';

export default class TaskList extends AppElement {
  static get is() { return 'task-list' }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._tasks = [];
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks = []) {
    this._tasks = tasks;
    this.renderList();
  }

  get listNode() {
    return this.shadowRoot.querySelector('ul');
  }

  renderList() {
    const list = this.listNode;
    const tasks = this.tasks;
    list.innerHTML = '';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task;
      list.appendChild(li);
    });
  }
}

window.customElements.define(TaskList.is, TaskList);
