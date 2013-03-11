/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('DictionaryModel', function (Y, NAME) {
    var mongo, db, dictionary;
    mongo = require('mongoskin');
    db = mongo.db(process.env.MONGOHQ_URL, {
        safe: true
    });
    dictionary = db.collection("dictionary");
    /**
     * The SearchModelFoo module.
     *
     * @module Search
     */

    /**
     * Constructor for the SearchModelFoo class.
     *
     * @class SearchModelFoo
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function (config) {
            this.config = config;
        },

        addWord: function (word, successCb, failureCb) {
            dictionary.update(
                {
                    "_id": word.word
                },
                {
                    "$push": {
                        entries: word.entry
                    }
                },
                {
                    upsert: true
                },
                function (err, result) {
                    if (err) {
                        Y.log(err, "error", NAME);
                        failureCb(err);
                        return;
                    }
                    Y.log(result, "debug", NAME);
                    successCb(result);
                }
            );
        },

        searchWord: function(word, successCb, failureCb) {

        }

    };

}, '0.0.1', {requires: []});
