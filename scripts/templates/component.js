module.exports = (ComponentName, elementName, elementPrefix) => {
    return `import { html, render } from '../../web_modules/lit-html.js';

export default class ${ComponentName} extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        render(this.render(), this.root);
    }

    render() {
        return html\`
            <style>
                :host {
                    display: block;
                }
            </style>
            <slot></slot>
        \`;
    }
}

customElements.define('${elementPrefix}-${elementName}', ${ComponentName});
`;
};
