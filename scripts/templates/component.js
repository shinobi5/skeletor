module.exports = (ComponentName, elementName, elementPrefix) => {
    return `import { component, html } from './js/web_modules/haunted.js';

const ${ComponentName} = () => {
    return html\`
        <style>
            :host {
                display: block;
            }
        </style>
        <slot></slot>
    \`;
};

customElements.define('${elementPrefix}-${elementName}', component(${ComponentName}));
`;
};
