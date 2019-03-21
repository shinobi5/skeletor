## Front-end boilerplate
Front-end boilerplate with [gulp](https://github.com/gulpjs/gulp) for build tasks and [nunjucks](https://github.com/mozilla/nunjucks) for templating.

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

### CSS

The gulp [css task](https://github.com/shinobi5/skeletor/blob/master/gulpfile.babel.js#L61) contenates and minifies the css contained in each folder (`src/css`) in the following order (from global to more specific styles):

1. Settings
2. Global
3. Elements
4. Objects
5. Components
6. Utilities

### TODO
1. Add CLI option for setup (static/styling/spa/templating...)
2. Add web component template generator
3. Add service worker
4. Add webapp manifest
5. Add option for routing
    * [sk-router](https://github.com/skatejs/skatejs/tree/master/packages/sk-router)
    * [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/master/packages/router)
    * [redux-first-router](https://github.com/faceyspacey/redux-first-router)
    * [app-router](https://github.com/erikringsmuth/app-router)
6. Add tests
    * [Jest](https://github.com/facebook/jest)
    * [pa11y](https://github.com/pa11y/pa11y)
7. Add bundler
    * [Rollup](https://rollupjs.org/guide/en#quick-start)
    * [Parcel](https://parceljs.org/)
    * [Webpack](https://webpack.js.org/)  
8. Add serverless option
