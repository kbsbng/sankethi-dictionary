/*jslint anon:true, sloppy:true, nomen:true*/
/*global YUI*/
YUI.add('Login', function(Y, NAME) {
    var url = require('url');
/**
 * The Login module.
 *
 * @module Login
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            var urlParsed, origUrl;
            urlParsed = url.parse(ac._adapter.req.originalUrl, true);
            origUrl = urlParsed.query['orig-url'];
            if (origUrl === undefined) {
                origUrl = "/";
            }

            ac.assets.addCss('./index.css');
            ac.done({
                origUrl : origUrl
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'LoginModelFoo']});
