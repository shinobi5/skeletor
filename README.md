## Skeletor

Front-end boilerplate with a focus on current and upcoming web standards. [Parcel](https://parceljs.org/) takes care of browsers that don't currently support module imports. Web component polyfills are included for browsers that lack support for Custom Elements, Shadow DOM and Templates/Slots.

It can be used for static projects or for spinnning up proof of concepts. A service worker and webmanifest are included for basic PWA features. A router like [redux-first-router](https://github.com/faceyspacey/redux-first-router) can be included with [redux](https://github.com/reduxjs/redux) to manage routes and state for SPA's (can be included via the setup CLI).

### Commands
These commands can be replaced with `npm` e.g. `npm run start`

+ `yarn setup`: Remove git, install dependencies and start the project
+ `yarn start`: Run server and watch files in dev mode with `parcel`
+ `yarn build`: Create build for production with `parcel`
+ `yarn test`: Run unit tests with [Jest](https://github.com/facebook/jest)
+ `yarn a11y`: Run accessibility tests with [pa11y-ci](https://github.com/pa11y/pa11y-ci)

### Creating web components
+ `yarn create-component`: CLI to create a component and test boilerplate under `src/js/components/{component}`
+ The script also imports and registers the component in `src/component-registry.js`. The barebones component is now ready to use e.g. `<x-component>I'm alive!</x-component>`
+ Custom element names require a dash e.g. x-component (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)). To change the default prefix update the value of `componentPrefix` in `scripts/build-registry.js` and rebuild the registry with `yarn build:registry`
+ A small library like [hyperHTML](https://github.com/WebReflection/hyperhtml) can be used as a virtual DOM alternative (can be included via the setup CLI)
+ See [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [webcomponents.org](https://www.webcomponents.org/introduction) for more info on getting started with web components.

### Todo
+ Add setup CLI:
	- Web components: `Yes` -> add registry (`component-registry.js` reference in `index.html`)
	- Renderer: `Yes` -> add [hyperHTML](https://github.com/WebReflection/hyperhtml) as a light virtual DOM alternative
	- SPA: add [redux](https://github.com/reduxjs/redux)) for state management and [redux-first-router](https://github.com/faceyspacey/redux-first-router) for routing.
+ Remove text utilitites
+ Add `grid` and `flex` starters
+ Update `css:concat` to concat CSS folders in correct order (without need for folder numbers)
+ Improve `component` and `test` templates
+ Add docs around the state of web components
+ Add web components [polyfill](https://www.webcomponents.org/polyfills)
