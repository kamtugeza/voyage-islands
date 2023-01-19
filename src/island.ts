export interface VoyageIsland {
  /** This is the starting point which is called once the JS is loaded. */
  mount(): Promise<void>;
}

export interface VoyageIslandConstructor<T> {
  new (
    /** An element that contains the `[data-island]` attribute. The anchor! */
    el: HTMLElement,
    
    /** 
     * An object stores all necessary values and objects that should be shared across
     * a webpage: stores, services, pub-sub, etc.
     */
    context: T
  ): VoyageIsland;
}
