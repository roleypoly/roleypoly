module.exports = {
    // target: 'serverless',
    publicRuntimeConfig: {
        apiPublicURI: process.env.API_PUBLIC_URI,
        uiPublicURI: process.env.UI_PUBLIC_URI,
    },
};
