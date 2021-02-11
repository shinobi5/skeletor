import { component, html } from "https://cdn.skypack.dev/haunted";

export const skeletor = () => {
  return html`
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
          'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
          'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #110e0c;
      }
      img {
        width: 180px;
      }
      h1 {
        color: white;
        text-align: center;
        font-weight: 900;
        letter-spacing: 0.5px;
        margin: 0;
      }
    </style>

    <div>
      <img
        src="img/skeletor.png"
        alt="Image of Skeletor, the lead villain, from Masters of the Universe"
      />
      <h1>Skeletor</h1>
    </div>
  `;
};

customElements.define("x-skeletor", component(skeletor));
