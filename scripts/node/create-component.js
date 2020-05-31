const path = require("path");
const fs = require("fs-extra");
const mkdirp = require("mkdirp");
const prompts = require("prompts");
const { info, error } = require("hankey");
const componentTemplate = require("../templates/component");
const componentsDir = path.join(process.cwd(), "src/js/components");

const elementPrefix = "x";

const processHyphen = pattern =>
  pattern.replace(/-([a-z])/gi, (_, match) => {
    return match.toUpperCase();
  });

(async () => {
  try {
    const response = await prompts({
      name: "componentName",
      type: "text",
      message: "Component name",
      initial: "Component"
    });
    createComponent(response);
  } catch (err) {
    error(`:bomb: ${err}`);
    process.exit(1);
  }
})();

function createComponent(config) {
  const { componentName } = config;
  const processedName = processHyphen(componentName);
  const componentDir = path.join(componentsDir, processedName);
  const componentFileName = path.join(componentDir, `${processedName}.js`);

  if (fs.existsSync(componentDir)) {
    error(`:bomb: ${processHyphen(componentDir)} already exists`);
    process.exit(1);
  }

  mkdirp.sync(componentDir);
  fs.writeFileSync(
    componentFileName,
    componentTemplate({
      componentName,
      elementPrefix,
      elementName: processedName
    })
  );
  info(`:floppy_disk: ${processedName} created`);
}
