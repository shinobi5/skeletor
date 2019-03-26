## Front-end boilerplate

These commands can be replaced with `npm` e.g. `npm run start`

+ `yarn setup`: Remove git, install dependencies and start the project
+ `yarn start`: Run server and watch files in dev mode with [parcel](https://parceljs.org/)
+ `yarn build`: Create build for production with [parcel](https://parceljs.org/)
+ `yarn test`: Run unit tests with [Jest](https://github.com/facebook/jest)
+ `yarn a11y`: Run accessibility tests with [pa11y-ci](https://github.com/pa11y/pa11y-ci)

### Creating web components
+ `yarn create-component`: CLI to create `component` and `test` templates under `src/js/components/{component}`
+ The script also runs `scripts/build-registry.js` which imports and registers the component in `src/component-registry.js`. The barebones component is now ready to use e.g. `<x-component>I'm alive!</x-component>`
+ Custom element names require a dash e.g. `'x-component'`. See [Using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). `x` is the default. To change this change the value of `componentPrefix` in `scripts/build-registry.js`.  
+ See [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [webcomponents.org](https://www.webcomponents.org/introduction) for more info on getting started with web components.

### Todo
+ Add component registry generator
+ Improve `component` and `test` templates
+ Add web components [polyfill](https://www.webcomponents.org/polyfills)
+ Add redux
+ Add router
