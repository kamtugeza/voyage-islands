import type { VoyageStatus } from './status';
import { VStatus } from './status';

type VoyageNodeStatuses = 'INITIALIZED' | 'PRELOADED' | 'MOUNTED';

export interface VoyageNode {
  children: VoyageNode[];
  el: HTMLElement;
  status: VoyageStatus<VoyageNodeStatuses>;
}

export class VNode implements VoyageNode {
  children: VoyageNode[];
  el: HTMLElement;
  status: VoyageStatus<VoyageNodeStatuses> = new VStatus('INITIALIZED');

  constructor(el: unknown) {
    this.validate(el);
    this.children = this.queryChildren(el);
    this.el = el;
  }

  private queryChildren(el: HTMLElement): VoyageNode[] {
    return Array.from(el.querySelectorAll('[data-island]'))
      .filter(childEl => childEl.parentElement?.closest('[data-island]') === el)
      .map(childEl => new VNode(childEl));
  }

  private validate(el: unknown): asserts el is HTMLElement {
    const isEl = el && el instanceof HTMLElement;
    if (!isEl) throw new TypeError('the `el` is not an instance of HTMLElement');
  }
}