import { type VoyageComponent, type VoyageComponentConstructor } from './component';
import { type VoyageLoader } from './loader';

export interface VoyageIsland {
  el: HTMLElement;
  children: VoyageIsland[];
  mount(): Promise<void>;
}

export interface VoyageIslandProps {
  el: HTMLElement;
  children: VoyageIsland[];
  scriptLoader: VoyageLoader<VoyageComponentConstructor>;
}

export type VoyageIslandFactory = (props: VoyageIslandProps) => VoyageIsland;

export class Island implements VoyageIsland {
  private scriptLoader: VoyageLoader<VoyageComponentConstructor>;
  children: VoyageIsland[];
  component!: VoyageComponent;
  el: HTMLElement;

  constructor({ children, el, scriptLoader }: VoyageIslandProps) {
    this.children = children;
    this.el = el;
    this.scriptLoader = scriptLoader;
  }

  async mount(): Promise<void> {
    const Component = await this.scriptLoader.load(this.el);
    this.component = new Component({
      el: this.el,
      children: this.children.map(child => child.el),
    });
    await this.component.onMount();
  }

  static of(props: VoyageIslandProps) {
    return new Island(props);
  }
}

