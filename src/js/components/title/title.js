import { component, html } from "https://cdn.skypack.dev/haunted";

export const title = () => {
  return html`
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
          'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
          'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      h1 {
        color: white;
        text-align: center;
        font-weight: 900;
        letter-spacing: 0.5px;
        margin: 0;
      }
    </style>
    <h1>
      <slot></slot>
    </h1>
  `;
};

customElements.define("x-title", component(title));
