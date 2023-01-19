import type { VoyageContext } from './types/context';
import { Voyager } from '../../src/voyager';
import { ToDoState } from './states/todoState';

document.addEventListener('DOMContentLoaded', () => {
  const todos = new ToDoState();
  const config = {
    context: { todos },
    el: document.querySelector('body'),
    dir: '/dist',
  };
  Voyager.of<VoyageContext>(config).launch();
}, { once: true });