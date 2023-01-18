type ToDoStateObserver = (value: string[]) => void;

export interface VoyageToDoState {
  add(task: string): void;
  subscribe(fn: ToDoStateObserver): void;
}

export class ToDoState implements VoyageToDoState {
  private observers: ToDoStateObserver[] = [];
  private list: string[] = [];

  add(task: string): void {
    this.list.push(task);
    this.observers.forEach(observer => observer(this.list));
  }

  subscribe(fn: ToDoStateObserver): void {
    this.observers.push(fn);
    fn(this.list);
  }
}
