# Voyage Islands

The *Voyage Islands* is an example of how you can organize work with your components on Multi-Page Application projects (e.g., [Magnolia CMS](https://www.magnolia-cms.com/)).

Inspired by [Astro](https://astro.build/) framework and its [Island Architecture](https://www.patterns.dev/posts/islands-architecture/), without Nodejs.

## Voyager

The [Voyager](./src/voyager.ts) is a starting point of an application that finds *island*s on a page, mounts them, and could kickstart other magic (e.g., observers).

## Island

Read [Island](./src/island.ts) as an isolated component that knows nothing about its parent, siblings and children, some kind of a selfish component 🙃.

Each *island* has it's own JS and CSS files. We download those files in runtime using a `[data-island]`'s value as the name of those files. For instance a *lighthouse* island:

```html
<div data-island="lighthouse"> 
  ...
</div>
```

```ts
// lighthouse.ts
import type { VoyageIsland } from '../../src/island'

export default class Lighthouse implements VoyageIsland<> {

  constructor(
    /** An element that contains the `[data-island]` attribute. The anchor! */
    private el: HTMLElement,
    
    /** 
     * An object stores all necessary values and objects that should be shared across
     * a webpage: stores, services, pub-sub, etc.
     */
    private context: unknown
  ) {}

  /** This is the starting point which is called once the JS is loaded. */
  async mount(): Promise<void> {
    // do your magic! 🧙🏻‍♂️
  }
}
```
```scss
// lighthouse.css 
[data-island="lighthouse"] {
  // There are no rules, anarchy! 🕺
}
```
