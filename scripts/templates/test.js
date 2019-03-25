module.exports = componentName => `import ${componentName} from './${componentName}';

customElements.define('x-${componentName}', ${componentName});

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

`;