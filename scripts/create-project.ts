import { Ask } from '../deps.ts';
import serviceWorkerTemplate from './templates/service-worker.ts';
import manifestTemplate from './templates/manifest.ts';
import actionsTemplate from './templates/actions.ts';
import reducersTemplate from './templates/reducers.ts';
import storeTemplate from './templates/store.ts';
import createComponentTemplate from './templates/create-component.ts';
import indexTemplate from './templates/index.ts';

const projectRoot = Deno.cwd();
const ask = new Ask();

const answers = await ask.prompt([
  {
    name: "projectName",
    type: "text",
    message: "Project name",
  },
  {
    name: "description",
    type: "text",
    message: "Project description"
  },
  {
    name: "css",
    type: "confirm",
    message: "Global CSS?",
  },
  {
    name: "elementPrefix",
    type: "text",
    message: "Web compoments prefix?",
  },
  {
    name: "state",
    type: "confirm",
    message: "Global state?",
  },
  {
    name: "stateType",
    type: "input",
    message: "State: Beedle or Redux?",
  },
  {
    name: "pwa",
    type: "confirm",
    message: "PWA?",
  },
  {
    name: "themeColor",
    type: "input",
    message: "PWA: Theme color",
  },
  {
    name: "backgroundColor",
    type: "input",
    message: "PWA: Background color",
  },
  {
    name: "enableServiceWorker",
    type: "input",
    message: "PWA: Enable offline service worker?",
  },
]);

createProject(answers);

function createProject(answers: any) {
  const encoder = new TextEncoder();

  Deno.writeFileSync(
    `${projectRoot}/src/index.js`, 
    encoder.encode(indexTemplate({
      description: answers.description,
      projectName: answers.projectName,
      isCSS: answers.css,
      isPWA: answers.pwa,
    }))
  );

  if(answers.state) {
    Deno.mkdirSync(`${projectRoot}/src/state/store`);
    Deno.mkdirSync(`${projectRoot}/src/state/actions`);
    Deno.mkdirSync(`${projectRoot}/src/state/reducers`);

    Deno.writeFileSync(
      `${projectRoot}/src/state/action.js`, 
      encoder.encode(actionsTemplate())
    );
    Deno.writeFileSync(
      `${projectRoot}/src/state/reducers.js`, 
      encoder.encode(reducersTemplate())
    );
    Deno.writeFileSync(
      `${projectRoot}/src/state/store.js`, 
      encoder.encode(storeTemplate())
    );
  }

  if(answers.pwa) {
    Deno.writeFileSync(
      `${projectRoot}/src/manifest.json`, 
      encoder.encode(manifestTemplate({
        backgroundColor: answers.backgroundColor,
        description: answers.description,
        projectName: answers.projectName,
        themeColor: answers.themeColor,
      }))
    );
    Deno.writeFileSync(
      `${projectRoot}/src/service-worker.js`, 
      encoder.encode(serviceWorkerTemplate({
        enableServiceWorker: answers.enableServiceWorker,
        projectName: answers.projectName,
      }))
    );
  }

  if (answers.elementPrefix) {
    Deno.writeFileSync(
      `${projectRoot}/src/service-worker.js`, 
      encoder.encode(createComponentTemplate(answers.elementPrefix))
    );
  }

  if (!answers.css) Deno.removeSync(`${projectRoot}/src/css`, { recursive: true });

  console.log(`:floppy_disk: Project setup complete`);
};
