import { Ask } from '../deps.ts';
import serviceWorkerTemplate from './templates/service-worker.ts';
import manifestTemplate from './templates/manifest.ts';

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
    message: "Project description",
  },
  {
    name: "themeColor",
    type: "text",
    message: "PWA: Theme color",
  },
  {
    name: "backgroundColor",
    type: "text",
    message: "PWA: Background color",
  },
  {
    name: "enableServiceWorker",
    type: "confirm",
    message: "PWA: Enable offline service worker?",
  },
]);

createPWA(answers);

function createPWA(answers: any) {
  const encoder = new TextEncoder();

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

  console.log(`:floppy_disk: PWA files created in src`);
};

