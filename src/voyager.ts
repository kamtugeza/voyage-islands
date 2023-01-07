import { Island, VoyageIsland, VoyageIslandFactory } from "./island";
import { Settler, VoyageSettler } from "./settler";

export interface VoyageVoyager {
  createIsland: VoyageIslandFactory;
  settler: VoyageSettler;
  discovery(el: unknown): Promise<VoyageIsland>;
}

export interface VoyageVoyagerProps {
  createIsland?: VoyageIslandFactory;
  settler?: VoyageSettler;
}

export class Voyager implements VoyageVoyager {
  createIsland: VoyageIslandFactory;
  settler: VoyageSettler;

  constructor({ createIsland = Island.of, settler = Settler.of() }: VoyageVoyagerProps = { }) {
    this.createIsland = createIsland;
    this.settler = settler;
  }

  async discovery(el: unknown): Promise<VoyageIsland> {
    const island = await this.getIsland(el);
    await this.settler.land(island);
    return island;
  }

  private async getChildren(parentEl: HTMLElement): Promise<VoyageIsland[]> {
    const islands = Array.from(parentEl.querySelectorAll('[data-island]'))
      .filter(el => el.parentElement?.closest('[data-island]') === parentEl);
    return Promise.all(islands.map(island => this.getIsland(island)));
  }

  private async getIsland(el: unknown): Promise<VoyageIsland> {
    this.validateEl(el);
    const children = await this.getChildren(el);
    return this.createIsland({ children, el })
  }

  private validateEl(el: unknown): asserts el is HTMLElement {
    const isEl = el && el instanceof HTMLElement;
    if (!isEl) throw new TypeError('the `el` is not an instance of HTMLElement');
  }

  static of(props?: VoyageVoyagerProps): VoyageVoyager {
    return new Voyager(props);
  }
}
