## Skeletor

__[Work in progress]__

Front-end boilerplate using [parcel](https://parceljs.org/) to handle bundling (for browsers lacking native support for es modules).

An optional web component [generator](https://github.com/shinobi5/skeletor/blob/master/scripts/create-component.js) produces a minimal [boilerplate](https://github.com/shinobi5/skeletor/blob/master/scripts/templates/component.js) and a corresponding test file.

A [service worker](https://github.com/shinobi5/skeletor/blob/master/src/service-worker.js) and [webmanifest](https://github.com/shinobi5/skeletor/blob/master/src/site.webmanifest) are included for PWA features. 

For SPAs, lightweight tools like [router-component](https://github.com/mkay581/router-component) and [beedle](https://github.com/andybelldesign/beedle) can be included for client-side routing and state management.

### Getting Started

Clone the repo and give the project a name
```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

Install npm modules, run the server at `localhost:1234` and watch files for changes 

```
yarn && yarn start
```

Boilerplate structure
```
src/
├── css
│   └── settings
│   └── global
│   └── elements
│   └── objects
│   └── utilities
├── font
├── img
├── js
│   └── components
│   └── utilities
├── index.html
├── index.js
├── component-registry.js
├── service-worker.js
└── site.webmanifest
└── favicon.ico
```

### Web Components

> Before generating a custom element change the default prefix (`x` by default) by updating the value of `componentPrefix` in [build-registry.js](https://github.com/shinobi5/skeletor/blob/master/scripts/build-registry.js). Custom element names require a dash (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements))

Create boilerplate component and test in `src/js/components/`
```
yarn create-component
```

The script also imports and registers the component in `src/component-registry.js`. The barebones component is now ready to use e.g. 
```
<x-component>I'm alive!</x-component>
```

#### Resources
+ [Gold standard](https://github.com/webcomponents/gold-standard/wiki)
+ [webcomponents.org](https://www.webcomponents.org)
+ [Open WC](https://open-wc.org/)
+ [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

### Tests
Run accessibility tests with [pa11y-ci](https://github.com/pa11y/pa11y-ci)
```
yarn a11y
```

### Build

Create build for production with [parcel](https://parceljs.org/)
```
yarn build
```

### Todo
1. Update css reset (it's a bit dated)
2. Investigate [axe-core](https://github.com/dequelabs/axe-core) for a11y unit testing
3. Investigate web component unit testing approaches (Shadow DOM?)
4. Investigate [pikapkg/web](https://github.com/pikapkg/web)
5. Setup CLI (components prefix, css option...)
6. register/unregister service worker function
