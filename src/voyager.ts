import type { VoyageNode} from './node';
import { VNode } from './node';

export interface VoyageVoyager {
  nodes: VoyageNode;
  launch(): VoyageVoyager;
}

export class VVoyager implements VoyageVoyager {
  nodes: VoyageNode;

  constructor(el: unknown) {
    this.nodes = new VNode(el);
  }

  launch(): VoyageVoyager {
    return this;
  }

  static of(el: unknown): VVoyager {
    return new VVoyager(el);
  }
}
