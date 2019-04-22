module.exports = component => {
return `import { html, render } from 'lit-html';

export default class ${component} extends HTMLElement {
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
`;
};
