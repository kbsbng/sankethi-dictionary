/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('AddWord', function (Y, NAME) {
    var utils = Y.mojito.sankethiDictionaryUtils;
    /**
     * The AddWord module.
     *
     * @module AddWord
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
        addWord: function(ac) {
            Y.log(ac.params.getFromBody("newWord"), "warn", NAME);
            var word = JSON.parse(ac.params.getFromMerged("newWord")),
                model = ac.models.get('DictionaryModel');
            word.entry.authors = [ utils.getUserEmail(ac) ];
            console.log(word);
            model.addWord(word, function() {
                ac.done("Success");
            }, function(err) {
                ac.error(err);
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-params-addon', "DictionaryModel", "sankethi-dictionary-util"]});
