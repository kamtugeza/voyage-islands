import { Island, VoyageIsland, VoyageIslandFactory } from "./island";
import { Settler, VoyageSettler } from "./settler";

export interface VoyageVoyager {
  discovery(el: unknown): Promise<VoyageIsland>;
}

export interface VoyageVoyagerProps {
  selector?: string;
  createIsland?: VoyageIslandFactory;
  settler?: VoyageSettler;
}

export class Voyager implements VoyageVoyager {
  private selector: string;
  private createIsland: VoyageIslandFactory;
  private settler: VoyageSettler;

  constructor({
    selector = '[data-island]',
    createIsland = Island.of,
    settler = Settler.of()
  }: VoyageVoyagerProps = { }) {
    this.selector = selector;
    this.createIsland = createIsland;
    this.settler = settler;
  }

  async discovery(el: unknown): Promise<VoyageIsland> {
    const island = this.getIsland(el);
    await this.settler.land(island);
    return island;
  }

  private getIsland(el: unknown): VoyageIsland {
    this.validateEl(el);
    const children = Array.from(el.querySelectorAll(this.selector))
      .filter(childEl => childEl.parentElement?.closest(this.selector) === el)
      .map(childEl => this.getIsland(childEl));
    return this.createIsland({ children, el });
  }

  private validateEl(el: unknown): asserts el is HTMLElement {
    const isEl = el && el instanceof HTMLElement;
    if (!isEl) throw new TypeError('the `el` is not an instance of HTMLElement');
  }

  static of(props?: VoyageVoyagerProps): VoyageVoyager {
    return new Voyager(props);
  }
}
