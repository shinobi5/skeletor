module.exports = (projectName, description, themeColor, backgroundColor) => {
    return `{
    "name": "${projectName}",
    "short_name": "${projectName}",
    "description": "${description}",
    "icons": [
        {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
        }
    ],
    "start_url": "/index.html",
    "display": "fullscreen",
    "theme_color": "${themeColor}",
    "background_color": "${backgroundColor}"
}
`;
};
