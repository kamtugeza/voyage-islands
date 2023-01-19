
import type { VoyageIslandConstructor } from './island';
import { StyleLoader, VoyageLoader } from './loader';
import { ScriptLoader } from './loader';
import { VoyageNode } from './node';

interface VoyagerConfig<T> {
  /** 
   * An object stores all necessary values and objects that should be shared across
   * a webpage: stores, services, pub-sub, etc.
   */
  context: T;
  
  /** The main island, aka the entry point of an application. */
  el: Element | null;

  /** The path to the island's JS and CSS folder. */
  dir: string;
}

export class Voyager<T> {
  private createNode = VoyageNode.of;
  private scriptLoader: VoyageLoader<VoyageIslandConstructor<T>> = new ScriptLoader(this.config.dir);
  private styleLoader: VoyageLoader<void> = new StyleLoader(this.config.dir);
  // TODO: add delayed hydration (e.g. when the component becomes visible)
  // TODO: create and observer for the component in/out of the viewport

  constructor(private config: VoyagerConfig<T>) {}

  async launch(): Promise<void> {
    await this.hydrate(this.config.el);
    // Here you can kickstart you magic like delayed hydration or some kind of observer.
  }

  private async hydrate(el: unknown): Promise<void> {
    /** Create a system node that contains element validation and useful utility methods. */
    const node = this.createNode(el);
    
    /** Download CSS. */
    await this.styleLoader.load(node);

    /** Download and mount an island with its HTMLElement and the global context. */
    const Island = await this.scriptLoader.load(node);
    await new Island(node.el, this.config.context).mount();

    /** Mount the island's children. */
    for await (const childEl of node.getChildren()) this.hydrate(childEl);
  }

  static of<T>(config: VoyagerConfig<T>): Voyager<T> {
    return new Voyager(config);
  }
}
