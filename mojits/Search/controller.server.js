/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('Search', function (Y, NAME) {

    /**
     * The Search module.
     *
     * @module Search
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
            ac.done({});
        },
        search: function (ac) {
            var word, model;
            word = ac.params.get("key");
            model = ac.models.get('DictionaryModel');
            model.searchWord(word, function(result) {
                ac.done(result);
            }, function(err) {

            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'DictionaryModel']});
