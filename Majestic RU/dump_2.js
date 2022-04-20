const cachedAssets = {};

global.requireAsset = s => (cachedAssets[s] || (cachedAssets[s] = require(`./assets/${s}.js`)), 
cachedAssets[s]), global.clearAsset = s => {
    cachedAssets[s] && delete cachedAssets[s];
}, require("./client.js");