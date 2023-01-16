import { Voyager } from '../../src/voyager';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await Voyager.of({
      el: document.querySelector('body'),
      dir: '/dist'
    }).launch();
  } catch (error) {
    console.error(error);
  }
});