import { createApp, serveStatic } from "../deps.ts";

const app = createApp();

app.use(serveStatic("./src"));
app.listen({ port: 1234 });
