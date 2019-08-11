# Skeletor

Front-end boilerplate with a focus on the web platform.

## Features

-   **Web component generator**: produces a minimal boilerplate and corresponding test file
-   **Service worker** for offline support
-   **Web manifest** for [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) features
-   [@pikapkg/web](https://github.com/pikapkg/web): provides the ability to consume npm packages directly in the browser without requiring a bundler
-   [lit-html](https://github.com/polymer/lit-html): virtual DOM alternative for performant updates to the DOM with web components
-   [router-component](https://github.com/mkay581/router-component): very lightweight web component for client-side routing
-   [beedle](https://github.com/andybelldesign/beedle): tiny library for client-side state management

## Getting Started

**Clone the repo and give the project a name**

```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

**Install npm modules and generate browser ready npm packages at `src/js/web_modules/`**

> npm packages listed in `dependencies` in `package.json` will be processed by `@pikapkg/web` and ready to be used directly in the browser without a module bundling build step. Search [pika](https://www.pika.dev/) for ESM ready packages.

```
yarn
```

**Serve the project at `localhost:1234`**

```
yarn start
```

**Create build for production in the root of the project at `/build`**

```
yarn build
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
│   └── objects
│   └── components
│   └── utilities
├── js
│   └── components
│   └── web_modules
├── index.html
├── index.js
├── component-registry.js
├── service-worker.js
└── manifest.json
└── favicon.ico
```

## Web Components

> Before generating a custom element change the component prefix (`x` by default) by updating the value of `componentPrefix` in [create-component.js](https://github.com/shinobi5/skeletor/blob/master/scripts/create-component.js). Custom element names require a dash (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements))

**Create boilerplate component and unit test file in `src/js/components/`**

```
yarn create-component
```

**Use the custom element**

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

**To create a component and auto-generate a file that imports all created components**

```
yarn create-component:registry
```

**Include `component-registry.js` in the page and use the custom elements**

```html
<head>
    <script type="module" src="component-registry.js" defer></script>
</head>
<body>
    <x-element-one>Custom element one</x-element-one>
    <x-element-two>Custom element two</x-element-two>
    <x-element-three>Custom element three</x-element-three>
</body>
```

### Server Side Rendering (SSR)

Server Side Rendering is still an unsolved problem when it comes to custom Web Components due to issues with rendering the Shadow DOM on the server or before Javascript runs on the client. This is a shame, but hopefully it is solved in the near future.

A proposal for a declarative `shadowroot` element looked promising but was ultimately rejected by browser implementers. See [this issue on Github](https://github.com/whatwg/dom/issues/510) and this is where [the hope ends](https://github.com/whatwg/dom/issues/510#issuecomment-370980398).

For further reading check out this article discussing [SSR for web components](https://medium.com/@treshugart/%C3%A5server-side-rendering-web-components-e5df705f3f48).

### Resources

-   [webcomponents](https://www.webcomponents.org)
-   [Open WC](https://open-wc.org/)
-   [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## CSS

Minimal global CSS is provided with tools to watch for changes and concatenate the individual files into a single minified `styles.css`.

The concatenating happens in order from broad to specific styles based on the folder they're in (in the following order): `settings, global, elements, objects, components, utilities`.

## Routing

The simplest way to get started using the [router-component](https://github.com/mkay581/router-component) is to include it via a script tag and then use it with web components for the routed views/pages.

```html
<head>
    <script src="js/web_modules/router-component.js"></script>
</head>
<body>
    <router-component>
        <x-first-page path="^/(index.html)?$"></x-first-page>
        <x-second-page path="second-page"></x-second-page>
        <x-page-doesnt-exist path=".*"></x-page-doesnt-exist>
    </router-component>
</body>
```

For more detail on how to use its features view the [official documentation](https://github.com/mkay581/router-component).

## State

View Beedle's [official documentation](https://beedle.hankchizljaw.io/) for how to use this tiny library to manage application state.

## Bundling

[Rollup](https://github.com/rollup/rollup) is included for optional bundling. See `rollup.config.js` for default configuration.

**Generate a bundled `index.js` file in `/build/js/`**

```
yarn build:bundle
```
