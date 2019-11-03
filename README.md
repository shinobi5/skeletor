# Skeletor

Front-end boilerplate with a focus on the web platform.

## Features

-   [Web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) generator
-   [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) generator
-   [redux](https://github.com/reduxjs/redux) and [beedle](https://github.com/andybelldesign/beedle) boilerplate generators
-   [lit-html](https://github.com/polymer/lit-html): HTML templates in JavaScript with template literals
-   [haunted](https://github.com/matthewp/haunted): React's Hooks API for web components
-   [router-component](https://github.com/mkay581/router-component): lightweight web component for client-side routing
-   [@pikapkg/web](https://github.com/pikapkg/web): consume npm packages directly in the browser
-   [babel](https://babeljs.io/): transpile JavaScript
-   [webpack](https://webpack.js.org/): module bundler

## Getting Started

**Clone the repository and give the project a name**

```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

**Initialise new git repository**

```
cd <project-name> && rm -rf .git && git init
```

**Install npm modules and generate browser ready npm packages at `src/js/modules/`**

> `yarn` is used but can be substituted with `npm` if that is preferred.

> npm packages listed in `dependencies` in `package.json` will be processed by `@pikapkg/web` and ready to be imported and used directly in the browser. Search [pika](https://www.pika.dev/) for esm ready packages.

```
yarn
```

**Serve the project at `localhost:8080`**

```
yarn start
```

**Create build for production in the root of the project at `build/`**

```
yarn build
```

**_Optional_: Create build and transpile JS with babel**

```
yarn build:babel
```

**_Optional_: Serve and bundle app with webpack**

> Remove `<script type="module" src="main.js"></script>` from `src/index.html` so only the bundled js files are included in the generated `build/index.html`.

Serve the project at `localhost:8080`

```
yarn start:webpack
```

Create build for production in the root of the project at `build/`

```
yarn build:webpack
```

## Web Components

> Custom element names require a hyphen (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)). Change the value of `elementPrefix` in `scripts/create-component.js` (default value is `x`)

**Create boilerplate component in `src/js/components/`**

```
yarn create-component
```

**Usage examples**

```html
<head>
    <script
        type="module"
        src="js/components/custom-element/custom-element.js"
        defer
    ></script>
</head>
<body>
    <x-custom-element>Custom element</x-custom-element>
</body>
```

```javascript
import { component, html } from '../../modules/haunted.js';
import '../CustomElement/CustomElement.js';

const App = () => {
    return html`
        <x-custom-element>Custom element</x-custom-element>
    `;
};

customElements.define('x-app', component(App));
```

### Server Side Rendering (SSR)

Server Side Rendering of custom web components is still an unsolved problem due to issues with rendering the ShadowDOM on the server.

A proposal for a declarative `shadowroot` element looked promising but was ultimately rejected by browser implementers.

### Resources

-   [webcomponents](https://www.webcomponents.org)
-   [Open WC](https://open-wc.org/)
-   [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
-   https://github.com/whatwg/dom/issues/510
-   https://github.com/whatwg/dom/issues/510#issuecomment-370980398
-   [SSR for web components](https://medium.com/@treshugart/%C3%A5server-side-rendering-web-components-e5df705f3f48)

## Styling

For web components, styles can be set within the element via the [shadowDOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) for encapsulated styles.

For global styles, minimal global CSS is provided with CLI tools to watch for changes and concatenate the individual files into a single minified `styles.css`.

The concatenating happens in order from broad to specific styles based on the folder they're in (in the following order): `settings, global, elements, components, utilities`.

Rename, add and remove folders from `src/css/` as necessary and update the `css:concat` script in [package.json](https://github.com/shinobi5/skeletor/blob/master/package.json) to customise concatenation order.

## Routing

Routing can be handled with [router-component](https://github.com/mkay581/router-component).

**Usage examples**

```html
<head>
    <script src="js/modules/router-component.js"></script>
    <script src="js/components/FirstPage/FirstPage.js"></script>
    <script src="js/components/SecondPage/SecondPage.js"></script>
    <script src="js/components/PageNotFound/PageNotFound.js"></script>
</head>
<body>
    <router-component>
        <x-first-page path="^/(index.html)?$"></x-first-page>
        <x-second-page path="second-page"></x-second-page>
        <x-page-not-found path=".*"></x-page-not-found>
    </router-component>
</body>
```

```javascript
import { component, html } from '../../modules/haunted.js';
import '../../modules/router-component.js';
import '../FirstPage/FirstPage.js';
import '../SecondPage/SecondPage.js';
import '../PageNotFound/PageNotFound.js';

const App = () => {
    return html`
        <router-component>
            <x-first-page path="^/(index.html)?$"></x-first-page>
            <x-second-page path="second-page"></x-second-page>
            <x-page-not-found path=".*"></x-page-not-found>
        </router-component>
    `;
};

customElements.define('x-app', component(App, { useShadowDOM: false }));
```

## State Management

If using web components with haunted's hooks API then state can be handled within the components. View haunted's [official documentation](https://github.com/matthewp/haunted) for examples.

Global state can be handled with either [redux](https://github.com/reduxjs/redux) or [beedle](https://github.com/andybelldesign/beedle) (both libraries included by default).

**Generate redux boilerplate at `src/state`**

```
yarn create-redux
```

**Generate beedle boilerplate at `src/state`**

```
yarn create-beedle
```

## Progressive Web App (PWA)

**Create PWA manifest and service worker files at `src`**

```
yarn create-pwa
```

**Include `manifest.json` and `service-worker.js` in `index.html`**

```
<link rel="manifest" href="manifest.json" />
```

```
<script href="service-worker.js"></script>
```
