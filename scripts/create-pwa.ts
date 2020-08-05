import { Ask } from "../deps.ts";
import serviceWorkerTemplate from "./templates/service-worker.ts";
import manifestTemplate from "./templates/manifest.ts";

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
    })),
  );

  Deno.writeFileSync(
    `${projectRoot}/src/service-worker.js`,
    encoder.encode(serviceWorkerTemplate({
      enableServiceWorker: answers.enableServiceWorker,
      projectName: answers.projectName,
    })),
  );

  console.log(`PWA files created`);
}
