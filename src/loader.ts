export interface VoyageLoader<T> {
  load(el: HTMLElement): Promise<T>;
}



