import { Island, VoyageIsland, VoyageIslandFactory } from "./island";

export interface VoyageLighthouse {
  createIsland: VoyageIslandFactory;
  discovery(el: unknown): VoyageIsland[];
}

export interface VoyageLighthouseProps {
  createIsland: VoyageIslandFactory;
}

export class Lighthouse implements VoyageLighthouse {
  createIsland: VoyageIslandFactory;

  constructor({ createIsland = Island.of }: VoyageLighthouseProps) {
    this.createIsland = createIsland;
  }

  discovery(el: unknown): VoyageIsland[] {
    const isEl = el instanceof HTMLElement;
    if (!isEl) throw new Error('`el` is not an instance of HTMLElement.');
    return Array.from(el.querySelectorAll('[data-voyage-island]'))
      .filter((el: Element): el is HTMLElement => el instanceof HTMLElement)
      .map(el => this.createIsland({ el }));
  }
}
