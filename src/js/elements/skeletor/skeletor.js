import { component, html } from "https://cdn.skypack.dev/haunted";
import css from 'https://cdn.skypack.dev/csz';
import "../../components/title/title.js";

export const skeletor = () => {
  return html`
    <div>
      <img
        class=${css`
          width: 180px;
        `}
        src="img/skeletor.png"
        alt="Image of Skeletor, the lead villain, from Masters of the Universe"
      />
      <x-title>Skeletor</x-title>
    </div>
  `;
};

customElements.define("x-skeletor", component(skeletor, { useShadowDOM: false }));
