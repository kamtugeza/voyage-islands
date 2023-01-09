import { Voyager } from '../../lib/index';


document.addEventListener('DOMContentLoaded', async () => {
  const voyager = new Voyager();
  console.dir(voyager);
  const dom = await Voyager.of().discovery(document.querySelector('body'));
  console.dir(dom);
});
