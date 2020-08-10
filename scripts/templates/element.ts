interface config {
  componentName: string;
  elementName: string;
  elementPrefix: string;
}

export default (config: config) => {
  return `import { component, html } from 'https://cdn.skypack.dev/haunted';

export const ${config.componentName} = () => {
  return html\`
    <p>Custom element</>
  \`;
};

customElements.define('${config.elementPrefix}-${config.elementName.toLowerCase()}', component(${config.componentName}, { useShadowDOM: false }));
`;
};
