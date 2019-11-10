# Skeletor

Front-end boilerplate with a focus on the web platform.

## Includes

-   [Web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) generator
-   [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) generator
-   [redux](https://github.com/reduxjs/redux) and [beedle](https://github.com/andybelldesign/beedle) boilerplate generators
-   [lit-html](https://github.com/polymer/lit-html): HTML templates in JavaScript with template literals
-   [haunted](https://github.com/matthewp/haunted): React's Hooks API for web components
-   [router-component](https://github.com/mkay581/router-component): lightweight web component for client-side routing
-   [@pikapkg/web](https://github.com/pikapkg/web): consume npm packages directly in the browser

## Getting started

**Clone the repository and give the project a name**

```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

**Initialise new git repository**

```
cd <project-name> && rm -rf .git && git init
```

**Setup CLI**

> `yarn` is used but can be substituted with `npm` if that is preferred

> `dependencies` will be processed by [@pikapkg/web](https://github.com/pikapkg/web) and ready to be imported and used directly in the browser. Search [pika](https://www.pika.dev/) for esm ready packages

> Custom element names require a hyphen (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)). Change this during setup (default is `x`)

```
yarn setup
```

**Serve the project at `localhost:8080`**

```
yarn start
```

**Create build for production in the root of the project at `build/`**

```
yarn build
```

## Web components

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

### Resources

-   [webcomponents](https://www.webcomponents.org)
-   [Open WC](https://open-wc.org/)
-   [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
-   [SSR for web components](https://medium.com/@treshugart/%C3%A5server-side-rendering-web-components-e5df705f3f48)

## Styling

When using web components, styles can be set within the [shadowDOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) and will be scoped to the component.

For global styles minimal CSS is provided by default (but can be disabled through the setup CLI) with tools to watch for changes and concatenate the individual files into a single minified `styles.css`.

The concatenating happens in order from broad to specific styles based on the folder they're in (in the following order): `settings, global, elements, components, utilities`.

## Router

See [router-component](https://github.com/mkay581/router-component).

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

## State

Haunted's hooks API provides state management within the components (same as the [React Hooks API](https://reactjs.org/docs/hooks-reference.html)). View haunted's [documentation](https://github.com/matthewp/haunted) for examples.

Global state can be handled with either [redux](https://github.com/reduxjs/redux) or [beedle](https://github.com/andybelldesign/beedle) with or without web components. Starter boilerplates can be generated through the setup CLI.
