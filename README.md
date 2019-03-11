## Skeletor
Simple Front-end boilerplate with gulp and nunjucks.

### Setup

Clone the project and give it a name

```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

cd into project and run the setup script to remove git files, install modules and start the project

```
bin/setup
```

Task commands are [here](https://github.com/shinobi5/skeletor/blob/master/package.json#L29) e.g. `npm run start` or `gulp`.

### CSS

The gulp [css task](https://github.com/shinobi5/skeletor/blob/master/gulpfile.babel.js#L61) contenates the css contained in each folder (`src/css`) in the following order (from global to specific styles):

1. Settings
2. Global
3. Elements
4. Objects
5. Components
6. Utilities
