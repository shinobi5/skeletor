const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');
const slash = require('slash');

const srcDir = path.join(process.cwd(), 'build'); 

connect().use(serveStatic(srcDir)).listen(1234, () => (
    console.log('Server running on 1234...')
));