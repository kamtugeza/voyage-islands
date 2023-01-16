import type { VoyageIsland } from '../../src/island';

export default class Body implements VoyageIsland {
  constructor(private el: HTMLElement) {}

  async mount() {
    setTimeout(() => this.el.classList.add('-animationAdded'), 100);
  }
}