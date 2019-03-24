module.exports = componentName => `import ${componentName} from './${componentName}';

describe('${componentName}', () => {
    
});

`;