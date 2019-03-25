## Front-end boilerplate

These commands can be replaced with `npm` e.g. `npm run start`

+ `yarn setup`: Remove git, install dependencies and start the project
+ `yarn start`: Run server and watch files in dev mode
+ `yarn build`: Create build for production
+ `yarn test`: Run unit tests
+ `yarn a11y`: Run accessibility tests

### Creating web components
+ `yarn create-component`: CLI to create component and test templates under `src/js/components/{component}`
+ Import component in `src/app.js`: `import component from './js/components/component/component';`
+ After the `import` register the component in `src/app.js`: `customElements.define('x-component', component);`
+ Custom element names require a dash e.g. `'x-component'`. See [Using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).
+ See [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for more info on how to build custom web components.

### Todo
+ Improve test template
+ Add redux
+ Add router
