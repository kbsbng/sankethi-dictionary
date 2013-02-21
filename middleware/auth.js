var auth;
auth = require('connect-auth');

const google2CallbackAddress = "http://sankethi-dictionary.kbsbng.com/oauth2callback";

module.exports = auth({strategies: [
    auth.Google2({appId: process.env.google2id, appSecret: process.env.google2secret, requestEmailPermission: true, callback: google2CallbackAddress})
], trace: true });