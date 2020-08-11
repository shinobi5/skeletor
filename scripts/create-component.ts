import { Ask } from "../deps.ts";
import componentTemplate from "./templates/component.ts";

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
    name: "shadowDOM",
    type: "confirm",
    message: "ShadowDOM?",
  },
]);

createComponent(answers);

function createComponent(answers: any) {
  const encoder = new TextEncoder();
  const processedName = processHyphen(answers.componentName);

  Deno.mkdirSync(`${projectRoot}/src/js/components/${answers.componentName}`, { recursive: true });
  Deno.writeFileSync(
    `${projectRoot}/src/js/components/${answers.componentName}/${answers.componentName}.js`,
    encoder.encode(componentTemplate({
      componentName: answers.componentName,
      elementName: processedName,
      elementPrefix,
      shadowDOM: answers.shadowDOM,
    })),
  );

  console.log(`${answers.componentName} component created`);
}
