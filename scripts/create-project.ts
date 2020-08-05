import { Ask } from "../deps.ts";
import serviceWorkerTemplate from "./templates/service-worker.ts";
import manifestTemplate from "./templates/manifest.ts";
import actionsTemplate from "./templates/actions.ts";
import reducersTemplate from "./templates/reducers.ts";
import storeTemplate from "./templates/store.ts";
import createComponentTemplate from "./templates/create-component.ts";
import indexTemplate from "./templates/index.ts";

const projectRoot = Deno.cwd();
const ask = new Ask();

const answers = await ask.prompt([
  {
    name: "projectName",
    type: "input",
    message: "Project name",
  },
  {
    name: "description",
    type: "input",
    message: "Project description",
  },
  {
    name: "css",
    type: "confirm",
    message: "Global CSS?",
  },
  {
    name: "elementPrefix",
    type: "input",
    message: "Web compoments prefix?",
  },
  {
    name: "state",
    type: "confirm",
    message: "Setup global state with Redux?",
  },
  {
    name: "themeColor",
    type: "input",
    message: "PWA - Theme color (hex)",
  },
  {
    name: "backgroundColor",
    type: "input",
    message: "PWA - Background color (hex)",
  },
  {
    name: "enableServiceWorker",
    type: "confirm",
    message: "PWA - Enable offline service worker?",
  },
]);

createProject(answers);

function createProject(answers: any) {
  const encoder = new TextEncoder();

  Deno.writeFileSync(
    `${projectRoot}/src/index.html`,
    encoder.encode(indexTemplate({
      description: answers.description,
      projectName: answers.projectName,
      isCSS: answers.css,
      isPWA: answers.pwa,
    })),
  );

  Deno.writeFileSync(
    `${projectRoot}/src/manifest.json`,
    encoder.encode(manifestTemplate({
      backgroundColor: answers.backgroundColor,
      description: answers.description,
      projectName: answers.projectName,
      themeColor: answers.themeColor,
    })),
  );

  Deno.writeFileSync(
    `${projectRoot}/src/service-worker.js`,
    encoder.encode(serviceWorkerTemplate({
      enableServiceWorker: answers.enableServiceWorker,
      projectName: answers.projectName,
    })),
  );

  if (answers.elementPrefix) {
    Deno.writeFileSync(
      `${projectRoot}/scripts/create-component.ts`,
      encoder.encode(createComponentTemplate(answers.elementPrefix)),
    );
  }

  if (answers.state) {
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
  }

  if (!answers.css) {
    Deno.removeSync(`${projectRoot}/src/css`, { recursive: true });
    Deno.removeSync(`${projectRoot}/src/styles.css`);
  }

  console.log(`Project setup complete`);
}
