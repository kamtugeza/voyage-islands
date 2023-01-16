import type { VoyageIsland } from '../../src/island';

export default class ToDoForm implements VoyageIsland {
  constructor(private el: HTMLElement) {}

  async mount(): Promise<void> {
    this.el.addEventListener('submit', this.onSubmit);
    this.getField()?.addEventListener('keyup', this.onChange);
  }

  private getField(): HTMLInputElement | null {
    const field = this.el.querySelector('.js-toDoField');
    return field instanceof HTMLInputElement ? field : null;
  }

  private onChange({ target }) {
    const isField = target instanceof HTMLInputElement;
    if (!isField) return;
    target.classList.toggle('-filled', !!target.value);
  }

  private onSubmit(event: SubmitEvent) {
    const form = event.target;
    const isForm = form instanceof HTMLFormElement;
    if (!isForm) return;
    event.preventDefault();
  }
}