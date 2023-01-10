import { type VoyageComponentConstructor } from './component';
import { type VoyageLoader } from './loader';

export interface ScriptLoaderProps {
  attrName?: string;
  pathPrefix?: string;
}

export class ScriptLoader implements VoyageLoader<VoyageComponentConstructor> {
  private attrName: string;
  private pathPrefix: string;
  
  constructor({ attrName = 'data-island', pathPrefix = '' }: ScriptLoaderProps = { }) {
    this.attrName = attrName;
    this.pathPrefix = pathPrefix;
  }

  async load(el: HTMLElement): Promise<VoyageComponentConstructor> {
    const filePath = el.getAttribute(this.attrName);
    if (!filePath) throw new Error('the component doesn\'t have script attribute');
    const scriptPath = this.buildPath(filePath);
    const { default: component } = await import(scriptPath);
    this.validate(component);
    return component;
  }

  private buildPath(path: string): string {
    const fileName = /\.js$/.test(path) ? path : `${path}.js`;
    return [this.pathPrefix, fileName].join('/');
  }

  private validate(component: any): asserts component is VoyageComponentConstructor {
    if (!component) throw new Error('the component should be exported by default.');
    if (typeof component.prototype?.onMount !== 'function') {
      throw new Error('the component should contain `onMount` method.');
    }
  }

  static of(props?: ScriptLoaderProps): VoyageLoader<VoyageComponentConstructor> {
    return new ScriptLoader(props);
  }
}