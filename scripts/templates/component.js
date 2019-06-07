module.exports = component => {
return `import { html, render } from 'lighterhtml';

export default class ${component} extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        render(this.root, this.render());
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
