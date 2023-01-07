export interface VoyageIsland {
  el: HTMLElement;
  children: VoyageIsland[];
  mount(): Promise<void>;
}

export interface VoyageIslandProps {
  el: HTMLElement;
  children: VoyageIsland[];
}

export type VoyageIslandFactory = (props: VoyageIslandProps) => VoyageIsland;

export class Island implements VoyageIsland {
  children: VoyageIsland[];
  el: HTMLElement;

  constructor({ children, el }: VoyageIslandProps) {
    this.children = children;
    this.el = el;
  }

  async mount(): Promise<void> {
    console.log('mounted', this.el);
  }

  static of(props: VoyageIslandProps) {
    return new Island(props);
  }
}

