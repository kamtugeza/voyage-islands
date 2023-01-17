import type { VoyageContext } from './types/context';
import { Voyager } from '../../src/voyager';
import { ToDoState } from './states/todoState';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await Voyager.of<VoyageContext>({
      context: {
        todos: new ToDoState(),
      },
      el: document.querySelector('body'),
      dir: '/dist'
    }).launch();
  } catch (error) {
    console.error(error);
  }
});