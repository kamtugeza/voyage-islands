import type { VoyageIsland } from '../../src/island';
import type { VoyageContext } from './types/context';

export default class Body implements VoyageIsland {
  private noTasksEl: Element | null;

  constructor(private el: HTMLElement, private context: VoyageContext) {}

  async mount() {
    this.noTasksEl = this.el.querySelector('.js-noTask');
    this.context.todos.subscribe(this.onToDoUpdate.bind(this));
    setTimeout(() => this.el.classList.add('-animationAdded'), 100);
  }

  private onToDoUpdate(list: string[]) {
    this.noTasksEl?.setAttribute('aria-hidden', `${!!list.length}`)
  }
}