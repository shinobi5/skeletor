const defaultConfig = {
  componentName: '',
  elementName: '',
  elementPrefix: 'x',
};

module.exports = (config = defaultConfig) => {
  return `import { html, render } from '../../web_modules/lit-html.js';

export class ${config.componentName} extends HTMLElement {
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

customElements.define('${config.elementPrefix}-${config.elementName.toLowerCase()}', ${config.componentName});
`;
};
