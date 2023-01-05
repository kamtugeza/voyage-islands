import { Island, VoyageIsland, VoyageIslandFactory } from "./island";

export interface VoyageLighthouse {
  createIsland: VoyageIslandFactory;
  discovery(el: HTMLElement): VoyageIsland;
}

export interface VoyageLighthouseProps {
  createIsland?: VoyageIslandFactory;
}

export class Lighthouse implements VoyageLighthouse {
  createIsland: VoyageIslandFactory;

  constructor({ createIsland = Island.of }: VoyageLighthouseProps = { }) {
    this.createIsland = createIsland;
  }

  discovery(el: HTMLElement): VoyageIsland {
    const children = Array.from(el.querySelectorAll('[data-island]'))
      .filter((childEl): childEl is HTMLElement => childEl instanceof HTMLElement)
      .filter(childEl => childEl.parentElement?.closest('[data-island]') === el)
      .map(childEl => this.discovery(childEl));
    return this.createIsland({ el, children });
  }
}
