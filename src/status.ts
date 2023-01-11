export interface VoyageStatus<T extends string> {
  get(): T;
  set(value: T): void;
}

export class VStatus<T extends string> implements VoyageStatus<T> {
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  set(value: T): void {
    this.value = value;
  }
}