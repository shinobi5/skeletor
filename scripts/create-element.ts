import { Ask } from "../deps.ts";
import elementTemplate from "./templates/element.ts";

const projectRoot = Deno.cwd();
const ask = new Ask();
const elementPrefix = "x";

const processHyphen = (pattern: string) =>
  pattern.replace(/-([a-z])/gi, (_, match) => {
    return match.toUpperCase();
  });

const answers = await ask.prompt([
  {
    name: "componentName",
    type: "input",
    message: "Component name:",
  },
  {
    name: "path",
    type: "input",
    message: "path (relative to src/js):",
  },
]);

createElement(answers);

function createElement(answers: any) {
  const encoder = new TextEncoder();
  const processedName = processHyphen(answers.componentName);

  Deno.mkdirSync(`${projectRoot}/src/js/elements`, { recursive: true });
  Deno.writeFileSync(
    `${projectRoot}/src/js/${answers.path}/${answers.componentName}/${answers.componentName}.js`,
    encoder.encode(elementTemplate({
      componentName: answers.componentName,
      elementName: processedName,
      elementPrefix,
    })),
  );

  console.log(`${answers.componentName} custom element created`);
}
