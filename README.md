## Skeletor

Front-end boilerplate with a focus on the web platform.

An optional web component [generator](https://github.com/shinobi5/skeletor/blob/master/scripts/create-component.js) produces a minimal [boilerplate](https://github.com/shinobi5/skeletor/blob/master/scripts/templates/component.js) (with [lit-html](https://github.com/polymer/lit-html) for template rendering) and a corresponding test file.

A simple [service worker](https://github.com/shinobi5/skeletor/blob/master/src/service-worker.js) and [manifest](https://github.com/shinobi5/skeletor/blob/master/src/manifest.json) are included for [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) features. 

### Overview

[Parcel](https://parceljs.org/) is included because it provides some nice development features (a local development server and [hot module replacement](https://parceljs.org/hmr.html)). It also provides configuration free bundling. 

[lit-html](https://github.com/polymer/lit-html) is included as a virtual DOM alternative for performant updates to the DOM.

Minimal global CSS is provided with tools to watch for changes and concatenate the individual files into a single minified `styles.css`. The concatenating happens in order from broad to specific styles based on the folder they're in (in the following order): `settings, global, elements, objects, utilities`. The intention is for these styles to be global in nature while a component's styles are applied via its encapsulated [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) (for custom web components).

[Router-component](https://github.com/mkay581/router-component) and [beedle](https://github.com/andybelldesign/beedle) are lightweight and recommended for adding client-side routing and state management. [Redux](https://github.com/reduxjs/redux) is another option for managing state.

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
└── manifest.json
└── favicon.ico
```

### Web Components

> Before generating a custom element change the component prefix (`x` by default) by updating the value of `componentPrefix` in [build-registry.js](https://github.com/shinobi5/skeletor/blob/master/scripts/build-registry.js). Custom element names require a dash (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements))

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
+ [webcomponents](https://www.webcomponents.org)
+ [Open WC](https://open-wc.org/)
+ [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

### Build

Create build for production with [parcel](https://parceljs.org/)
```
yarn build
```

### Todo
+ Register/unregister service worker function
+ Look into web component unit testing approaches (Shadow DOM)
+ Setup CLI (project name, components prefix, css option etc.)
+ Look into [axe-core](https://github.com/dequelabs/axe-core) for a11y unit testing
+ Look into [pikapkg/web](https://github.com/pikapkg/web)
