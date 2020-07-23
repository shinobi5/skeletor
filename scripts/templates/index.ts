interface config {
  description: string,
  projectName: string,
  isCSS: boolean,
  isPWA: boolean,
};

export default (config: config) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>${config.projectName}</title>
    <meta name="description" content="${config.description}" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${config.isPWA ? `<link rel="manifest" href="manifest.json" />` : ''}
    <link rel="shortcut icon" href="favicon.ico" />
    ${config.isCSS ? `<link rel="stylesheet" href="styles.css" />` : ''}
  </head>
  <body>
    <noscript>
      For full functionality of this site you may need to enable
      JavaScript. Here are the
      <a href="https://www.enable-javascript.com/"
          >instructions for enabling JavaScript in your web browser</a
      >.
    </noscript>

    <main id="content">
      <x-skeletor></x-skeletor>
    </main>

    ${config.isPWA ? `<script src="service-worker.js"></script>` : ''}
    <script type="module" src="app.js"></script>
  </body>
</html>
`;
};
