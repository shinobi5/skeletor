const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const prompt = require('prompt');
const { info, error } = require('hankey');
const componentTemplate = require('./templates/component');
const componentsDir = path.join(process.cwd(), 'src/js/components');

const elementPrefix = 'x';

const processHyphen = pattern =>
    pattern.replace(/-([a-z])/gi, (_, match) => {
        return match.toUpperCase();
    });

prompt.start();

prompt.get(
    [
        {
            description: 'Component name',
            name: 'componentName',
            type: 'string',
            pattern: /^[a-zA-Z0-9\-]+$/,
            default: 'Component',
            required: true,
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
        componentTemplate(processedName, componentName, elementPrefix)
    );
    info(`:floppy_disk: ${processedName} created`);
}
