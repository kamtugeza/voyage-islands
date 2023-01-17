export interface VoyageToDoState {
  add(task: string): void;
}

export class ToDoState implements VoyageToDoState {
  private list: string[] = [];

  add(task: string): void {
    this.list.push(task);
    console.log(this.list);
  }
}
