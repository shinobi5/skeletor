## Front-end boilerplate

These commands can be replaced with `npm` e.g. `npm run start`

+ `yarn setup`: Remove git, install dependencies and start the project
+ `yarn start`: Run server and watch files in dev mode
+ `yarn build`: Create build for production
+ `yarn test`: Run tests

### Creating components
+ `yarn create-component`: CLI to create component and test templates under `src/js/components/{component}`
+ Import component in `src/app.js`: `import component from './js/components/component/component';`
+ Register the component in `src/app.js`: `customElements.define('x-component', component);`
+ __Note:__ Custom element names require a dash e.g. `x-component`. See [Using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

### Todo
+ Add redux
+ Add router
