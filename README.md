## Front-end boilerplate

### Setup

Clone the project and give it a name

```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

cd into project and run the setup script to remove git files, install modules and start the project

```
bin/setup
```

Task commands are found under [scripts](https://github.com/shinobi5/skeletor/blob/master/package.json#L29) in `package.json` e.g. `yarn start` or `gulp`.

See [gulpfile](https://github.com/shinobi5/skeletor/blob/master/gulpfile.babel.js) for tasks.

### TODO
1. Remove `gulp` and replace necessary tasks with `npm scripts`
2. Add bundler (one of)
    + [Rollup](https://rollupjs.org/guide/en#quick-start)
    + [Parcel](https://parceljs.org/)
    + [Webpack](https://webpack.js.org/) 
3. Add web component template generator
4. Configure [Jest](https://jestjs.io/) and [pa11y](https://github.com/pa11y/pa11y)
5. Add routing (one of)
    + [sk-router](https://github.com/skatejs/skatejs/tree/master/packages/sk-router)
    + [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/master/packages/router)
    + [redux-first-router](https://github.com/faceyspacey/redux-first-router)
    + [app-router](https://github.com/erikringsmuth/app-router)
6. Add webapp manifest 
7. Add service worker   
8. Add serverless options
9. Add CLI for setup and scaffolding
    + Web components
    + Templating
    + CSS
    + SPA/Routing
    + Serverless
