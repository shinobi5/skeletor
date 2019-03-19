## Skeletor
Simple Front-end boilerplate using [gulp](https://github.com/gulpjs/gulp) for build tasks and [nunjucks](https://github.com/mozilla/nunjucks) for the templating.

### Setup

Clone the project and give it a name

```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

cd into project and run the setup script to remove git files, install modules and start the project

```
bin/setup
```

Task commands are found under [scripts](https://github.com/shinobi5/skeletor/blob/master/package.json#L29) in `package.json` e.g. `npm run start` or `gulp`.

See [gulpfile](https://github.com/shinobi5/skeletor/blob/master/gulpfile.babel.js) for tasks.

### CSS

The gulp [css task](https://github.com/shinobi5/skeletor/blob/master/gulpfile.babel.js#L61) contenates the css contained in each folder (`src/css`) in the following order (from global to more specific styles):

1. Settings
2. Global
3. Elements
4. Objects
5. Components
6. Utilities
