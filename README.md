## Skeletor [WIP]

Front-end boilerplate using [parcel](https://parceljs.org/) for bundling, generating a local development server and [hot module replacement](https://parceljs.org/hmr.html).

An optional web component [generator](https://github.com/shinobi5/skeletor/blob/master/scripts/create-component.js) produces a minimal [boilerplate](https://github.com/shinobi5/skeletor/blob/master/scripts/templates/component.js) (with [lighterhtml](https://github.com/WebReflection/lighterhtml) for template rendering) and a corresponding test file.

A [service worker](https://github.com/shinobi5/skeletor/blob/master/src/service-worker.js) and [webmanifest](https://github.com/shinobi5/skeletor/blob/master/src/site.webmanifest) are included for [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) features. 

For [SPA's](https://en.wikipedia.org/wiki/Single-page_application), lightweight tools like [router-component](https://github.com/mkay581/router-component) and [beedle](https://github.com/andybelldesign/beedle) can be included for client-side routing and state management.

### Rationale

The intention of this boilerplate is to remove remove as many abstraction layers as possible from building front-end websites and applications. To be as close to the lower level web API as possible while still providing minimal requirements for building static websites, PWA's and SPA's.

[parcel](https://parceljs.org/) is included because it provides some nice development features (a development server and hot module replacement). It also provides configuration free bundling. 

[lighterhtml](https://github.com/WebReflection/lighterhtml) is included because it feels like reactive templates should be a native feature in custom web components. A native alternative (without the reactive features) would be [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) (with some potential security issues...).

[router-component](https://github.com/mkay581/router-component) and [beedle](https://github.com/andybelldesign/beedle) are recommended for adding SPA features because they're lightweight, framework agnostic and inspired by the web platform.

Global CSS is provided (with an opinionated structure) with tools to concatenate and minify the separate files. The intention is for these styles to be global in nature while component styles are applied via each components encapsulated [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) (for custom web components).

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
