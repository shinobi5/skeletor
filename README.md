## Skeletor

Front-end boilerplate with [parcel](https://parceljs.org/) to take care of browsers that lack support for module imports. Web component polyfills are included for browsers that lack support for Custom Elements, Shadow DOM and Templates/Slots.

It can be used for static projects or for spinnning up proof of concepts. A service worker and webmanifest are included for basic PWA features. [Redux-first-router](https://github.com/faceyspacey/redux-first-router) and [redux](https://github.com/reduxjs/redux) can be included to manage routes and state for SPA's.

### Commands
These commands can be replaced with `npm` e.g. `npm run start`

+ `yarn start`: Build, run server and watch files in dev mode with `parcel`
+ `yarn build`: Create build for production with `parcel`
+ `yarn test`: Run unit tests with [Jest](https://github.com/facebook/jest)
+ `yarn a11y`: Run accessibility tests with [pa11y-ci](https://github.com/pa11y/pa11y-ci)

### Generating web components
+ `yarn create-component`: CLI to create component and unit test boilerplates in `src/js/components/{component}`
+ The script also imports and registers the component in `src/component-registry.js`. The barebones component is now ready to use e.g. `<x-component>I'm alive!</x-component>`
+ Custom element names require a dash e.g. x-component (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)). To change the default prefix update the value of `componentPrefix` in `scripts/build-registry.js` and rebuild the registry with `yarn build:registry`
+ A small library like [hyperHTML](https://github.com/WebReflection/hyperhtml) can be used as a virtual DOM alternative.

### Web component resources
+ [Gold standard](https://github.com/webcomponents/gold-standard/wiki)
+ [webcomponents.org](https://www.webcomponents.org/introduction)
+ [Open WC](https://open-wc.org/)
+ [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
