const defaultConfig = {
    backgroundColor: '',
    description: '',
    projectName: '',
    themeColor: '',
};

module.exports = (config = defaultConfig) => {
    return `{
    "name": "${config.projectName}",
    "short_name": "${config.projectName}",
    "description": "${config.description}",
    "icons": [
        {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
        }
    ],
    "start_url": "/index.html",
    "display": "fullscreen",
    "theme_color": "${config.themeColor}",
    "background_color": "${config.backgroundColor}"
}
`;
};
