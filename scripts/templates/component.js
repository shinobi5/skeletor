module.exports = component => {
return `export default class ${component} extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = \`
            <style></style>
            <div>
                <slot></slot>
            </div>
        \`;
    }
}
`;
};
