<h1 align="center">
<br>
  <a href="https://github.com/shinobi5/skeletor"><img src="src/img/skeletor.png" alt="Image of Skeletor, the lead villain, from Masters of the Universe" width="150"></a>
<br>
<br>
Skeletor
</h1>

<p align="center">Front-end boilerplate for the web platform with <a href="https://deno.land/">Deno</a>.</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-rebeccapurple.svg?style=flat-square" alt="License MIT">
  </a>
</p>

<hr />

**Includes**
- [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) generator with [lit-html](https://github.com/polymer/lit-html) and [haunted](https://github.com/matthewp/haunted)
- [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) manifest and service worker generator
- [redux](https://github.com/reduxjs/redux) boilerplate generator

**Notes**
> Still a work in progress

> Project requires [deno](https://deno.land/) and [velociraptor](https://github.com/umbopepato/velociraptor/) to be installed

> Custom element names require a hyphen (see [using custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)). Change this during setup (default: `x`)

## Getting started

**Clone the repository and give the project a name**

```
git clone git@github.com:shinobi5/skeletor.git <project-name>
```

**Initialise new git repository**

```
cd <project-name> && rm -rf .git && git init
```

**Setup project**

```
vr setup
```

**Serve the project at `localhost:1234`**

```
vr start
```

**Create build for production in the root of the project at `build/`**

```
vr build
```

## Components

#### Custom elemement with ShadowDOM

**Create boilerplate web component in `src/js/components/`**

```
vr create-component
```

#### Custom element without ShadowDOM

**Create boilerplate web component in `src/js/elements/`**

```
vr create-element
```

#### Usage examples

```html
<head>
  <script
    type="module"
    src="js/components/custom-component/custom-component.js"
    defer
  ></script>
</head>
<body>
  <x-custom-component>Custom element</x-custom-component>
</body>
```

```javascript
import { component, html } from 'https://cdn.skypack.dev/haunted';
import '../customComponent/customComponent.js';

const app = () => {
  return html`
    <x-custom-component>Custom element</x-custom-component>
  `;
};

customElements.define('x-app', component(app));
```

#### Resources

- [webcomponents](https://www.webcomponents.org)
- [Open WC](https://open-wc.org/)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [SSR for web components](https://medium.com/@treshugart/%C3%A5server-side-rendering-web-components-e5df705f3f48)

## CSS

#### ShadowDOM
When using web components, styles can be set within the [shadowDOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) and will be natively encapsulated within the component.

#### CSS-in-JS
A framework agnostic CSS-in-JS solution like [csz](https://github.com/lukejacksonn/csz) can be used to generate scoped styles for custom elements without a shadowDOM (alternatively just create component scoped styles with a CSS naming method like [BEM](http://getbem.com/)).

```javascript
import { component, html } from 'https://cdn.skypack.dev/haunted';
import css from 'https://cdn.skypack.dev/csz';

const customElement = () => {
  return html`
    <div class=${
      css`
        color: rebeccapurple;
        background-color: black;
        padding: 20px;
      `
    }>
      Custom element with scoped runtime generated styles!
    </div>
  `;
};

customElements.define('x-custom-element', component(customElement, { useShadowDOM: false }));
```

#### Global CSS
Basic global styles are provided by default (but can be disabled through the setup CLI) with tools to watch for changes and concatenate the individual files into a single minified `styles.css`.

The concatenating happens in order from broad to specific styles based on the folder they're in (in the following order): `settings, global, elements, components, utilities`.

## State

[Haunted](https://github.com/matthewp/haunted) provides internal component state management (same as [react hooks](https://reactjs.org/docs/hooks-reference.html)).

Global state can be handled with [redux](https://github.com/reduxjs/redux) and boilerplate files can be generated through the setup step or by running:

```
vr create-redux
```

## Routing

Routing examples using [router-component](https://github.com/mkay581/router-component).

```html
<head>
  <script src="https://cdn.skypack.dev/router-component"></script>
  <script src="js/components/firstPage/firstPage.js"></script>
  <script src="js/components/secondPage/secondPage.js"></script>
  <script src="js/components/pageNotFound/pageNotFound.js"></script>
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
import { component, html } from 'https://cdn.skypack.dev/haunted';
import 'https://cdn.skypack.dev/router-component';
import '../firstPage/firstPage.js';
import '../secondPage/secondPage.js';
import '../pageNotFound/pageNotFound.js';

const app = () => {
  return html`
    <router-component>
      <x-first-page path="^/(index.html)?$"></x-first-page>
      <x-second-page path="second-page"></x-second-page>
      <x-page-not-found path=".*"></x-page-not-found>
    </router-component>
  `;
};

customElements.define('x-app', component(app, { useShadowDOM: false }));
```
