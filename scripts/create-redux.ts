import actionsTemplate from "./templates/actions.ts";
import reducersTemplate from "./templates/reducers.ts";
import storeTemplate from "./templates/store.ts";

const projectRoot = Deno.cwd();
const encoder = new TextEncoder();

Deno.mkdirSync(`${projectRoot}/src/state/store`, { recursive: true });
Deno.mkdirSync(`${projectRoot}/src/state/actions`, { recursive: true });
Deno.mkdirSync(`${projectRoot}/src/state/reducers`, { recursive: true });

Deno.writeFileSync(
  `${projectRoot}/src/state/actions/actions.js`,
  encoder.encode(actionsTemplate()),
);
Deno.writeFileSync(
  `${projectRoot}/src/state/reducers/reducers.js`,
  encoder.encode(reducersTemplate()),
);
Deno.writeFileSync(
  `${projectRoot}/src/state/store/store.js`,
  encoder.encode(storeTemplate()),
);

console.log(`Redux boilerplate files created`);
