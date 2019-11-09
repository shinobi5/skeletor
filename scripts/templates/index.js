module.exports = (bundler, description, projectName, pwa) => {
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>${projectName}</title>
        <meta name="description" content="${description}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${pwa && `<link rel="manifest" href="manifest.json" />`}
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
        <noscript>
            For full functionality of this site you may need to enable
            JavaScript. Here are the
            <a href="https://www.enable-javascript.com/"
                >instructions for enabling JavaScript in your web browser</a
            >.
        </noscript>

        <a href="#content" class="sr-only">Skip to content</a>

        <main id="content">
            Content
        </main>

        ${pwa && `<script src="service-worker.js"></script>`}
        ${!bundler && `<script type="module" src="app.js"></script>`}
    </body>
</html>
`;
};
