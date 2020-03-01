module.exports = (ComponentName, elementName, elementPrefix) => {
    return `import { component, html } from '../../web_modules/haunted.js';

export const ${ComponentName} = () => {
    return html\`
        <style>
            :host {
                display: block;
            }
        </style>
        <slot></slot>
    \`;
};

customElements.define('${elementPrefix}-${elementName.toLowerCase()}', component(${ComponentName}));
`;
};
