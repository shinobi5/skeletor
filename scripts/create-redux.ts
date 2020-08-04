import actionsTemplate from "./templates/actions.ts";
import reducersTemplate from "./templates/reducers.ts";
import storeTemplate from "./templates/store.ts";

const projectRoot = Deno.cwd();
const stateDir = `${projectRoot}/src/state`;
const encoder = new TextEncoder();

Deno.mkdirSync(`${stateDir}/store`);
Deno.mkdirSync(`${stateDir}/actions`);
Deno.mkdirSync(`${stateDir}/reducers`);

Deno.writeFileSync(
  `${stateDir}/action.js`,
  encoder.encode(actionsTemplate()),
);

Deno.writeFileSync(
  `${stateDir}/reducers.js`,
  encoder.encode(reducersTemplate()),
);

Deno.writeFileSync(
  `${stateDir}/store.js`,
  encoder.encode(storeTemplate()),
);

console.log(`:floppy_disk: Redux boilerplate files created in src/state`);
