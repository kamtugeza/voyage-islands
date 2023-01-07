import { VoyageIsland } from './island';

export interface VoyageSettler {
  land(island: VoyageIsland): Promise<void>;
}

export class Settler implements VoyageSettler {
  async land(island: VoyageIsland): Promise<void> {
    await island.mount();
    for await (const child of island.children) this.land(child);
  }

  static of(): VoyageSettler {
    return new Settler();
  }
}