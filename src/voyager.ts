import { type VoyageComponentConstructor } from "./component";
import { Island, VoyageIsland, VoyageIslandFactory } from "./island";
import { type VoyageLoader } from "./loader";
import { ScriptLoader } from "./script-loader";
import { Settler, VoyageSettler } from "./settler";

export interface VoyageVoyager {
  discovery(el: unknown): Promise<VoyageIsland>;
}

export interface VoyageVoyagerProps {
  selector?: string;
  createIsland?: VoyageIslandFactory;
  scriptLoader?: VoyageLoader<VoyageComponentConstructor>;
  settler?: VoyageSettler;
}

export class Voyager implements VoyageVoyager {
  private selector: string;
  private createIsland: VoyageIslandFactory;
  private scriptLoader: VoyageLoader<VoyageComponentConstructor>;
  private settler: VoyageSettler;

  constructor({
    selector = '[data-island]',
    createIsland = Island.of,
    scriptLoader = ScriptLoader.of({ pathPrefix: '/dist' }),
    settler = Settler.of()
  }: VoyageVoyagerProps = { }) {
    this.selector = selector;
    this.createIsland = createIsland;
    this.scriptLoader = scriptLoader;
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
    return this.createIsland({
      children,
      el,
      scriptLoader: this.scriptLoader,
    });
  }

  private validateEl(el: unknown): asserts el is HTMLElement {
    const isEl = el && el instanceof HTMLElement;
    if (!isEl) throw new TypeError('the `el` is not an instance of HTMLElement');
  }

  static of(props?: VoyageVoyagerProps): VoyageVoyager {
    return new Voyager(props);
  }
}
