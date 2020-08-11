interface config {
  componentName: string;
  elementName: string;
  elementPrefix: string;
  shadowDOM: boolean;
}

export default (config: config) => {
  return `import { component, html } from 'https://cdn.skypack.dev/haunted';

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

customElements.define('${config.elementPrefix}-${config.elementName.toLowerCase()}', component(${config.componentName}, { useShadowDOM: ${config.shadowDOM }));
`;
};
