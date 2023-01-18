import type { VoyageIsland } from '../../src/island';
import { VoyageToDoState } from './states/todoState';
import type { VoyageContext } from './types/context';

export default class Form implements VoyageIsland {
  private control: HTMLButtonElement | null = null;
  private field: HTMLInputElement | null = null;
  private todos: VoyageToDoState;

  constructor(private el: HTMLElement, context: VoyageContext) {
    this.todos = context.todos;
  }

  async mount(): Promise<void> {
    this.el.addEventListener('submit', this.onSubmit.bind(this));
    this.control = this.getControl();
    this.toggleControl(true);
    this.field = this.getField();
    this.field?.addEventListener('keyup', this.onChange.bind(this));
  }

  private clearField() {
    if (!this.field) return;
    this.field.value = '';
  }

  private getControl(): HTMLButtonElement | null {
    const control = this.el.querySelector('.js-toDoControl');
    return control instanceof HTMLButtonElement ? control : null;
  }

  private getField(): HTMLInputElement | null {
    const field = this.el.querySelector('.js-toDoField');
    return field instanceof HTMLInputElement ? field : null;
  }

  private onChange({ target }) {
    const isField = target instanceof HTMLInputElement;
    if (!isField) return;
    target.classList.toggle('-filled', !!target.value);
    this.toggleControl(!target.value);
  }

  private onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const task = this.field?.value;
    if (!task) return;
    this.todos.add(task);
    this.clearField();
  }

  private toggleControl(isDisabled: boolean = true): void {
    this.control?.toggleAttribute('disabled', isDisabled);
  }
}