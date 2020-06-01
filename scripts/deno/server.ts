import { createApp, serveStatic } from 'https://servestjs.org/@v1.1.0/mod.ts';
const app = createApp();
app.use(serveStatic('./src'));
app.listen({ port: 1234 });
