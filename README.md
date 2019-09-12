# Skeletor

Front-end boilerplate with a focus on the web platform.

## Features

-   **Web component generator**: produces a minimal boilerplate and corresponding test file
-   **Service worker**: offline support
-   **Web manifest**: [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) features
-   [lit-html](https://github.com/polymer/lit-html): virtual DOM alternative for performant updates to the DOM with web components
-   [router-component](https://github.com/mkay581/router-component): very lightweight web component for client-side routing
-   [beedle](https://github.com/andybelldesign/beedle): tiny library for client-side state management
-   [@pikapkg/web](https://github.com/pikapkg/web): provides the ability to consume npm packages directly in the browser
-   [rollup](https://github.com/rollup/rollup): JS bundler
-   [babel](https://babeljs.io): JS transpiler

## Getting Started

**Clone the repository and give the project a name**

```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

**Initialize new git repository**

```
cd <project-name> && rm -rf .git && git init
```

**Point to the new repository (assuming one exists)**

```
git remote set-url origin <repo-url>
```

**Push skeletor boilerplate to the new repository**

```
git push origin master
```

**Install npm modules and generate browser ready npm packages at `src/js/web_modules/`**

> npm packages listed in `dependencies` in `package.json` will be processed by `@pikapkg/web` and ready to be used directly in the browser without a module bundling build step. Search [pika](https://www.pika.dev/) for esm ready packages.

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

**_Build option:_ Create build and compile JS with babel**

```
yarn build:babel
```

**_Build option:_ Create build, compile JS with babel and generate bundle with rollup**

```
yarn build:bundle
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
├── app.js
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

### Server Side Rendering (SSR)

Server Side Rendering is still an unsolved problem when it comes to custom Web Components due to issues with rendering the Shadow DOM on the server or before JavaScript runs on the client.

A proposal for a declarative `shadowroot` element looked promising but was ultimately rejected by browser implementers. See [this issue on Github](https://github.com/whatwg/dom/issues/510) and this is where [the hope ends](https://github.com/whatwg/dom/issues/510#issuecomment-370980398).

For further reading check out this article discussing [SSR for web components](https://medium.com/@treshugart/%C3%A5server-side-rendering-web-components-e5df705f3f48).

### Resources

-   [webcomponents](https://www.webcomponents.org)
-   [Open WC](https://open-wc.org/)
-   [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## CSS

Minimal global CSS is provided with CLI tools to watch for changes and concatenate the individual files into a single minified `styles.css`.

The concatenating happens in order from broad to specific styles based on the folder they're in (in the following order): `settings, global, elements, objects, components, utilities`.

Rename, add and remove folders from `src/css/` as necessary and update the `css:concat` script in [package.json](https://github.com/shinobi5/skeletor/blob/master/package.json) to customise concatenation order.

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

## Todo

1. Select test frameworks and create web component test boilerplate
1. Improve scripts
1. Add state examples and generated boilerplate
1. Add uglify-es CLI to scripts for JS minifying
