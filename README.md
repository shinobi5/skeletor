## Skeletor
Front-end boilerplate with gulp and nunjucks.

### Setup

Clone the project

```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

cd into project and run the setup script to remove git files, install modules and start the project

```
bin/setup
```

### CSS

Gulp [css task](https://github.com/shinobi5/skeletor/blob/master/gulpfile.babel.js#L61) contenates the css contained in each folder in the following order:

1. Settings
2. Global
3. Elements
4. Objects
5. Components
6. Utilities
