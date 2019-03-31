## Skeletor

Front-end boilerplate with [parcel](https://parceljs.org/) for bundling dependencies.

A web component generator (`scripts/create-component.js`) produces a minimal web component boilerplate and test file. However, Web components are not required to be used. If web components are not used, component styles can be created in `src/css/components`. Web components don't need external component styles because styles can be encapsulated within the custom element via the shadowDOM.

A service worker and webmanifest are included for basic PWA features. For single page applications, a router like [sk-router](https://github.com/skatejs/skatejs/tree/master/packages/sk-router) can be used with [redux](https://redux.js.org/) for state management.

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

### Web component resources
+ [Gold standard](https://github.com/webcomponents/gold-standard/wiki)
+ [webcomponents.org](https://www.webcomponents.org)
+ [Open WC](https://open-wc.org/)
+ [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
