import { VoyageIslandConstructor } from './island';
import { VoyageNode } from './node';

export abstract class VoyageLoader<T> {
  constructor(protected dir: string) {}

  abstract load(node: VoyageNode): Promise<T>;
}

export class ScriptLoader<T> extends VoyageLoader<VoyageIslandConstructor<T>> {
  async load(node: VoyageNode): Promise<VoyageIslandConstructor<T>> {
    const { default: island } = await import(`${this.dir}/${node.getName()}.js`);
    return island;
  }
}

export class StyleLoader extends VoyageLoader<void> {
  async load(node: VoyageNode): Promise<void> {
    const link = document.createElement('link');
    link.href = `${this.dir}/${node.getName()}.css`;
    link.rel = 'stylesheet';
    document.head.append(link);
  }
}
