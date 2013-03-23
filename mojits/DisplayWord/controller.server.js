/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('DisplayWord', function(Y, NAME) {

/**
 * The DisplayWord module.
 *
 * @module DisplayWord
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
            var word, model, entryIndex, view, viewConf;

            viewConf = {
                "noun" : "displayNoun",
                "verb" : "displayVerb",
                "pronoun" : "displayNoun",
                "adjective" : "displayAdj"
            };
            word = ac.params.getFromMerged("key");
            entryIndex = ac.params.getFromMerged("entryIndex");
            model = ac.models.get('DictionaryModel');
            Y.log("Searching for " + word, "debug");
            ac.assets.addCss('./index.css');
            model.searchWord(word, function(result) {
                Y.log(result, "debug");
                view = result.entries[entryIndex].type;
                ac.done({word : result._id, entry : result.entries[entryIndex]}, viewConf[view]);
            }, function(err) {
                Y.log(err, "error", NAME);
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-params-addon',  "DictionaryModel"]});
