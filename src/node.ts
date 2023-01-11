export class VoyageNode {
  el: HTMLElement;

  constructor(el: unknown) {
    const isHtmlEl = el && el instanceof HTMLElement;
    if (!isHtmlEl) throw new TypeError('the `el` is not an instance of `HTMLElement`');
    this.el = el;
  }

  getChildren(): Element[] {
    return Array.from(this.el.querySelectorAll('[data-island]'))
      .filter(childEl => childEl.parentElement?.closest('[data-island]') === this.el)
  }

  getName(): string {
    const name = this.el.getAttribute('data-island');
    if (!name) throw new Error('the `el` doesn\'t have the island\'s name attribute');
    return name;
  }

  static of(el: unknown) {
    return new VoyageNode(el);
  }
}