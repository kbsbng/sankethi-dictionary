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

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
        getData: function (callback) {
            callback(null, { some: 'data' });
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
        }

    };

}, '0.0.1', {requires: []});
