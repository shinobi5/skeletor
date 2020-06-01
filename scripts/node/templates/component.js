const defaultConfig = {
    componentName: '',
    elementName: '',
    elementPrefix: 'x',
};

module.exports = (config = defaultConfig) => {
    return `import { component, html } from '../../web_modules/haunted.js';

export const ${config.componentName} = () => {
    return html\`
        <style>
            :host {
                display: block;
            }
        </style>
        <slot></slot>
    \`;
};

customElements.define('${config.elementPrefix}-${config.elementName.toLowerCase()}', component(${config.componentName}));
`;
};
