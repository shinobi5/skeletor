# Skeletor

Framework agnostic front-end boilerplate with a focus on the web platform.

## Features

-   [Web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) generator
-   [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) support: web app manifest and service worker for offline support
-   [lit-html](https://github.com/polymer/lit-html): HTML templates in JavaScript with template literals
-   [haunted](https://github.com/matthewp/haunted): React's Hooks API for web components
-   [router-component](https://github.com/mkay581/router-component): very lightweight web component for client-side routing
-   [beedle](https://github.com/andybelldesign/beedle): tiny library for client-side state management
-   [@pikapkg/web](https://github.com/pikapkg/web): consume npm packages directly in the browser

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

**Serve the project at `localhost:1234`**

```
yarn start
```

**Create build for production in the root of the project at `build/`**

```
yarn build
```

**_Option:_ Create build and transpile JS with babel**

```
yarn build:babel
```

**Boilerplate structure**

```
src/
├── font
├── img
├── css
│   └── settings
│   └── global
│   └── elements
│   └── components
│   └── utilities
├── js
│   └── components
│   └── modules
├── index.html
├── app.js
├── service-worker.js
└── manifest.json
└── favicon.ico
```

## Web Components

> Custom element names require a hyphen (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)). Set element prefix in the `create-component` setup.

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

```javascript
import { html, render } from '../../modules/lit-html.js';
import '../CustomElement/CustomElement.js';

class App extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        render(this.render(), this.root);
    }

    render() {
        return html`
            <x-custom-element>Custom element</x-custom-element>
        `;
    }
}

customElements.define('x-app', App);
```

### Server Side Rendering (SSR)

Server Side Rendering is still an unsolved problem when it comes to custom Web Components due to issues with rendering the ShadowDOM on the server or before JavaScript runs on the client.

A proposal for a declarative `shadowroot` element looked promising but was ultimately rejected by browser implementers.

### Resources

-   [webcomponents](https://www.webcomponents.org)
-   [Open WC](https://open-wc.org/)
-   [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
-   https://github.com/whatwg/dom/issues/510
-   https://github.com/whatwg/dom/issues/510#issuecomment-370980398
-   [SSR for web components](https://medium.com/@treshugart/%C3%A5server-side-rendering-web-components-e5df705f3f48)

## Styling

If using web components, component styles can be set within the component via the [shadowDOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) for encapsulated styles.

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

```javascript
import { html, render } from '../../modules/lit-html.js';
import '../../modules/router-component.js';
import '../FirstPage/FirstPage.js';
import '../SecondPage/SecondPage.js';
import '../PageNotFound/PageNotFound.js';

class App extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        render(this.render(), this);
    }

    render() {
        return html`
            <router-component>
                <x-first-page path="^/(index.html)?$"></x-first-page>
                <x-second-page path="second-page"></x-second-page>
                <x-page-not-found path=".*"></x-page-not-found>
            </router-component>
        `;
    }
}

customElements.define('x-app', App);
```

## State Management

If using web components with haunted's hooks API then state can be handled within the components. View haunted's [official documentation](https://github.com/matthewp/haunted) for examples.

Global state can be handled with beedle. View beedle's [official documentation](https://beedle.hankchizljaw.io/) for how to use this tiny library to manage application state.

Alternatively, [redux](https://github.com/reduxjs/redux) can be used to manage global application state by adding it to the project.
