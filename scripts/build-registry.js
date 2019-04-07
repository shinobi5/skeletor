const { info, error } = require('hankey');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const slash = require('slash');

const srcDir = slash(path.join(process.cwd(), 'src')); 
const componentsDir = slash(path.join(process.cwd(), 'src/js/components')); 
const componentRegistry = path.join(srcDir, 'component-registry.js');
const components = glob.sync(`${componentsDir}/*/`);
const componentPrefix = 'vt';

const header = `/**
 * Auto generated components registry
 */
 `;

const componentExports = components.map(componentPath => {
    const component = path.basename(componentPath, '.js');
    
    const camelCaseComponent = component.replace(/-([a-z])/gi, (s, group1) => {
        return group1.toUpperCase();
    });
	
	return `import ${camelCaseComponent} from './js/components/${component}/${component}'; 
	customElements.define('${componentPrefix}-${component}', ${camelCaseComponent});`
});

const output = [header, ...componentExports].join('\n');

try {
	fs.writeFileSync(componentRegistry, output);
	info(`:floppy_disk: Component added to ${componentRegistry}`);
} catch (err) {
	error(`:bomb: ${err}`);
}
