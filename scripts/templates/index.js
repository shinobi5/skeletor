module.exports = (projectName, enableServiceWorker) => {
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>${projectName}</title>
        <meta name="description" content="${description}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="manifest.json" />
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

        <script src="service-worker.js"></script>
        <script type="module" src="main.js"></script>
    </body>
</html>
`;
};
