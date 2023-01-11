import { VoyageNode } from "./node";

class VEngine {
  private scriptLoader: unknown;
  private styleLoader: unknown;

  constructor(private nodes: VoyageNode) {}

  launch() {}
  
  kill() {}
}