const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src'); 

connect().use(serveStatic(srcDir)).listen(1234, () => (
    console.log('Server running on 1234...')
));