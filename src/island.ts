export interface VoyageIsland {
  mount(): Promise<void>;
}

export interface VoyageIslandConstructor<T> {
  new (el: HTMLElement, context: T): VoyageIsland;
}
