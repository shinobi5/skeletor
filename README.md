## Skeletor

Front-end boilerplate with a focus on current and upcoming web standards. Its purpose is to be as vanilla as possible, while adding a bundler (parcel) to take care of browsers that don't currently support module imports. Web component polyfills are included for browsers that lack support for: Custom Elements, Shadow DOM and templates/slots.

It can be used for static projects or for spinnning up proof of comcepts. A service worker and webmanifest are included for basic PWA features. A router like [redux-first-router](https://github.com/faceyspacey/redux-first-router) can be used with [redux](https://github.com/reduxjs/redux) to manage routes and state for SPA's.

### Commands
These commands can be replaced with `npm` e.g. `npm run start`

+ `yarn setup`: Remove git, install dependencies and start the project
+ `yarn start`: Run server and watch files in dev mode with [parcel](https://parceljs.org/)
+ `yarn build`: Create build for production with [parcel](https://parceljs.org/)
+ `yarn test`: Run unit tests with [Jest](https://github.com/facebook/jest)
+ `yarn a11y`: Run accessibility tests with [pa11y-ci](https://github.com/pa11y/pa11y-ci)

### Creating web components
+ `yarn create-component`: CLI to create a component and test boilerplate under `src/js/components/{component}`
+ The script also imports and registers the component in `src/component-registry.js`. The barebones component is now ready to use e.g. `<x-component>I'm alive!</x-component>`
+ Custom element names require a dash e.g. x-component (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)). To change the default prefix update the value of `componentPrefix` in `scripts/build-registry.js` and rebuild the registry with `yarn build:registry`  
+ See [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [webcomponents.org](https://www.webcomponents.org/introduction) for more info on getting started with web components.

### Todo
+ Remove text utilitites
+ Add `grid` and `flex` starters
+ Update `css:concat` to concat CSS folders in correct order (without need for folder numbers)
+ Create script to add `component-registry.js` reference in `index.html` so the registry is not included by default (current state) when web components aren't used in the project
+ Improve `component` and `test` templates
+ Add docs around the state of web components
+ Add web components [polyfill](https://www.webcomponents.org/polyfills)
+ Look into [document-register-element](https://github.com/WebReflection/document-register-element)
+ Look into [redux](https://github.com/reduxjs/redux) and [redux-first-router](https://github.com/faceyspacey/redux-first-router)
