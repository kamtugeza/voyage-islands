export interface VoyageIsland {
  el: HTMLElement;
  children: VoyageIsland[];
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

  static of(props: VoyageIslandProps) {
    return new Island(props);
  }
}

