## Skeletor

Front-end boilerplate using [parcel](https://parceljs.org/) for browsers lacking native support for es modules.

An optional web component [generator](https://github.com/shinobi5/skeletor/blob/master/scripts/create-component.js) produces a minimal [boilerplate](https://github.com/shinobi5/skeletor/blob/master/scripts/templates/component.js) (includes [lit-html](https://github.com/polymer/lit-html) for fast template rendering) and a corresponding test file.

A service worker and webmanifest are included for basic PWA features. For SPAs the lightweight [router-component](https://github.com/mkay581/router-component) is included to handle routing while [redux](https://github.com/reduxjs/redux) is included for managing state.

### Getting Started

Clone the repo and give the project a new name
```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

Install npm modules, run the server (`localhost:1234`) and watch files for changes 

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
```

### Web Components

> Before generating a custom element change the default prefix (`x` by default) by updating the value of `componentPrefix` in `scripts/build-registry.js`. Custom element names require a dash e.g. `x-component` (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements))

> If web components aren't used then remove `<script type="module" src="component-registry.js"></script>` from `index.html`

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
Run unit tests with [jest](https://github.com/facebook/jest)
```
yarn test
```

Run accessibility tests with [pa11y-ci](https://github.com/pa11y/pa11y-ci)
```
yarn a11y
```

### Build

Create build for production with [parcel](https://parceljs.org/)
```
yarn build
```
