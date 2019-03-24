## Front-end boilerplate

These commands can be replaced with `npm` e.g. `npm run start`

+ `yarn setup`: Remove git, install dependencies and start the project
+ `yarn start`: Run server and watch files in dev mode
+ `yarn build`: Create build for production
+ `yarn test`: Run tests
+ `yarn create-component`: CLI to create component and test templates under `src/js/components/{component}`

### Creating components
+ Import component to `src/app.js` e.g. `import component from './js/components/component/component';` and then register the component e.g. `customElements.define('x-component', component);`

### Todo
+ Add redux
+ Add router
