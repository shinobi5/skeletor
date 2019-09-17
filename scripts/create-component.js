const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const prompt = require('prompt');
const { info, error } = require('hankey');
const component = require('./templates/component');
const componentHooks = require('./templates/component-hooks');
const testTemplate = require('./templates/test');
const componentsDir = path.join(process.cwd(), 'src/js/components');

const processHyphen = pattern =>
    pattern.replace(/-([a-z])/gi, (_, match) => {
        return match.toUpperCase();
    });

let componentTemplate;

prompt.start();

prompt.get(
    [
        {
            description: 'Component name',
            name: 'componentName',
            type: 'string',
            pattern: /^[a-zA-Z0-9\-]+$/,
            default: 'Component',
        },
        {
            description: 'Component prefix',
            name: 'componentPrefix',
            type: 'string',
            pattern: /^[a-zA-Z0-9]+$/,
            default: 'x',
        },
        {
            description: 'Use Hooks API?',
            name: 'hooks',
            type: 'string',
            pattern: /^yes|no$/,
            message: 'Enter yes or no',
            default: 'yes',
        },
    ],
    (err, result) => {
        if (err) {
            error(`:bomb: ${err}`);
            process.exit(1);
        } else {
            createComponent(result);
            process.exit();
        }
    }
);

function createComponent(config) {
    const { componentName, componentPrefix, hooks } = config;
    componentTemplate = hooks === 'yes' ? componentHooks : component;
    const processedName = processHyphen(componentName);
    const componentDir = path.join(componentsDir, processedName);
    const componentFileName = path.join(componentDir, `${processedName}.js`);
    const testFileName = path.join(componentDir, `${processedName}.test.js`);

    if (fs.existsSync(componentDir)) {
        error(`:bomb: ${processHyphen(componentDir)} already exists`);
        process.exit(1);
    }

    mkdirp.sync(componentDir);
    fs.writeFileSync(
        componentFileName,
        componentTemplate(processedName, componentName, componentPrefix)
    );
    fs.writeFileSync(testFileName, testTemplate(processedName));
    info(`:floppy_disk: ${processedName} created`);
}
