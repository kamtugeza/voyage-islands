export interface VoyageIsland {
  mount(): Promise<void>;
}

export type VoyageIslandConstructor = new (el: HTMLElement) => VoyageIsland;
