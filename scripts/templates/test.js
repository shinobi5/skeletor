module.exports = component => `import ${component} from './${component}';

console.log(${component});

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

`;