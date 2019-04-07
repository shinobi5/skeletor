module.exports = {
    camelCaseHyphen: pattern => (
        pattern.replace(/-([a-z])/gi, (_, match) => {
            return match.toUpperCase();
        })
    )
};