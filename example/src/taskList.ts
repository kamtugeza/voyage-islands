import type { VoyageIsland } from '../../src/island';
import type { VoyageContext } from './types/context';

export default class TaskList implements VoyageIsland {
  constructor(private el: HTMLElement, private context: VoyageContext) {}

  async mount() {
    this.context.todos.subscribe(this.onViewUpdate.bind(this));
  }

  private onViewUpdate(list: string[]): void {
    this.el.setAttribute('aria-hidden', `${!list.length}`);
    this.el.innerHTML = list.map(task => `<li>${task}</li>`).join('');
  }
}