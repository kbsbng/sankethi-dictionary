/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('SearchPage', function (Y, NAME) {

    /**
     * The SearchPage module.
     *
     * @module SearchPage
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
        index: function (ac) {
            ac.assets.addCss('./index.css');
            ac.composite.done();
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'SearchPageModelFoo', "mojito-composite-addon"]});
