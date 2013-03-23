/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('DictionaryModel', function (Y, NAME) {
    var mongo;
    mongo = Y.mojito.sankethiDictionaryMongo;
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
            mongo.dictionary.update(
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
            mongo.dictionary.findOne({
                "_id" : word
            }, function(err, wordResult) {
                if (err) {
                    failureCb(err);
                    return;
                }
                successCb(wordResult);
            });
        }

    };

}, '0.0.1', {requires: ["sankethi-dictionary-mongo"]});
