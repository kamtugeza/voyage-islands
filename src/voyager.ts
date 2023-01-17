
import type { VoyageIslandConstructor } from './island';
import { StyleLoader, VoyageLoader } from './loader';
import { ScriptLoader } from './loader';
import { VoyageNode } from './node';

interface VoyagerConfig<T> {
  context: T;
  el: Element | null;
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
  }

  private async hydrate(el: unknown): Promise<void> {
    const node = this.createNode(el);
    await this.styleLoader.load(node);
    const Island = await this.scriptLoader.load(node);
    await new Island(node.el, this.config.context).mount(); // TODO pass context object
    for await (const childEl of node.getChildren()) this.hydrate(childEl);
  }

  static of<T>(config: VoyagerConfig<T>): Voyager<T> {
    return new Voyager(config);
  }
}
