var url = require("url");
var nonLoginPaths = {
    "/login": true,
    "/favicon.ico": true,
    "/search": true,
    "/": true
};

var nonLoginPatterns = [
    '^/combo~',
    '^/static',
    '^/login',
    '^/search($|/)',
    '\.js$',
    '^/static/Search/.*',
    '^/word\?.*'
];

var nonLoginTunnelTypes = {
    Search : true
};
//noinspection FunctionWithInconsistentReturnsJS
module.exports = function (req, res, next) {
    "use strict";
    if (process.env.ENV === "dev") {
        return next();
    }
    var i, urlp;
    console.log("Url: " + req.url);
    if (nonLoginPaths[req.url]) {
        return next();
    }
    if (req.url === "/tunnel") {
        if (nonLoginTunnelTypes[req.body.instance.type] === true) {
            return next();
        }
    }
    for (i = 0; i < nonLoginPatterns.length; i = i + 1) {
        if (req.url.match(nonLoginPatterns[i])) {
            return next();
        }
    }
    urlp = url.parse(req.originalUrl, true);
    if (urlp.query.login_with) {
        req.authenticate([urlp.query.login_with], function (error, authenticated) {
            if (error) {
                console.error(error);
                res.end("Error: " + error);
                return;
            }
            if (authenticated) {
                res.writeHead(303, { 'Location': urlp.query['orig-url'] });
                res.end('Redirecting');
                //res.send("<html><h1>Hello Google user:" + JSON.stringify( req.getAuthDetails() ) + ".</h1></html>");
                return;
            }
            console.log("not authenitcated!!  authentication failed");
            //res.send("<html><h1>Facebook authentication failed :( </h1></html>");
        });
        return;
    }

    if (req.url === "/logout") {
        req.logout();
        res.writeHead(303, { 'Location': "/" });
        res.end('');
        return;
    }

    if (!req.isAuthenticated()) {
        console.log("Not authenticated");
        res.writeHead(303, { 'Location': "/login?orig-url=" + req.url });
        res.end('Redirecting to login page');
        return;
    }
    console.log("This means req is authenticated");
    return next();
};