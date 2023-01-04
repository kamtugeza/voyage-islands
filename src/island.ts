export interface VoyageIsland {
  el: HTMLElement;
}

export interface VoyageIslandProps {
  el: HTMLElement;
}

export type VoyageIslandFactory = (props: VoyageIslandProps) => VoyageIsland;

export class Island implements VoyageIsland {
  el: HTMLElement;

  constructor({ el }: VoyageIslandProps) {
    this.el = el;
  }

  static of(props: VoyageIslandProps) {
    return new Island(props);
  }
}

