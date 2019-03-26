const { info, error } = require('hankey');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const slash = require('slash');

const srcDir = slash(path.join(process.cwd(), 'src')); 
const componentsDir = slash(path.join(process.cwd(), 'src/js/components')); 
const componentRegistry = path.join(srcDir, 'component-registry.js');
const components = glob.sync(`${componentsDir}/*/`);
const componentPrefix = 'x';

const header = `/**
 * Auto generated components registry
 */
 `;

const componentExports = components.map(componentPath => {
	const component = path.basename(componentPath, '.js');
	
	return `import ${component} from './js/components/${component}/${component}'; 
	customElements.define('${componentPrefix}-${component}', ${component});`
});

const output = [header, ...componentExports].join('\n');

try {
	fs.writeFileSync(componentRegistry, output);
	info(`:floppy_disk: Component saved to ${componentRegistry}`);
} catch (err) {
	error(`:bomb: ${err}`);
}
