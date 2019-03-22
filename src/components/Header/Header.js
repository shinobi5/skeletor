export default class Header extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <style></style>

            <header>
                <nav>
                    <ul>
                        <slot></slot>
                    </ul>
                </nav>
            </header>
        `;
    }

    connectedCallback() {
        // ...
    }

    attributeChangedCallback() {
        // ...
    }
}