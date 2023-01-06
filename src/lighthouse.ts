import { Island, VoyageIsland, VoyageIslandFactory } from "./island";

export interface VoyageLighthouse {
  createIsland: VoyageIslandFactory;
  discovery(el: unknown): Promise<VoyageIsland>;
}

export interface VoyageLighthouseProps {
  createIsland?: VoyageIslandFactory;
}

export class Lighthouse implements VoyageLighthouse {
  createIsland: VoyageIslandFactory;

  constructor({ createIsland = Island.of }: VoyageLighthouseProps = { }) {
    this.createIsland = createIsland;
  }

  async discovery(el: unknown): Promise<VoyageIsland> {
    this.validateIsland(el);
    const children = await this.getNested(el);
    return this.createIsland({ el, children });
  }

  private async getNested(parentEl: HTMLElement): Promise<VoyageIsland[]> {
    const islands = Array.from(parentEl.querySelectorAll('[data-island]'))
      .filter(el => el.parentElement?.closest('[data-island]') === parentEl);
    return Promise.all(islands.map(island => this.discovery(island)));
  }

  private validateIsland(el: unknown): asserts el is HTMLElement {
    const isEl = el && el instanceof HTMLElement;
    if (!isEl) throw new TypeError('the `el` is not an instance of HTMLElement');
  }
}
