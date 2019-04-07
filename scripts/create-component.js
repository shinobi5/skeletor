const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const prompt = require('prompt');
const { info, error } = require('hankey');

const componentTemplate = require('./templates/component');
const testTemplate = require('./templates/test');
const componentsDir = path.join(process.cwd(), 'src/js/components');

prompt.start();

prompt.get(
	[
		{
			description: 'Component name',
			name: 'componentName',
			type: 'string',
            pattern: /^[a-zA-Z0-9\-]+$/,
			default: 'component'
		}
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
	const componentDir = path.join(componentsDir, componentName);
	const componentFileName = path.join(componentDir, `${componentName}.js`);
	const testFileName = path.join(componentDir, `${componentName}.test.js`);

	if (fs.existsSync(componentDir)) {
		error(`:bomb: ${componentDir} already exists`);
		process.exit(1);
	}

	mkdirp.sync(componentDir);
	fs.writeFileSync(componentFileName, componentTemplate(componentName));
	fs.writeFileSync(testFileName, testTemplate(componentName));
	info(`:floppy_disk: ${componentName} created`);
}
