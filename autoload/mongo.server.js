YUI.add('sankethi-dictionary-mongo', function (Y) {
    "use strict";
    var mongo, db, dictionary, users;
    mongo = require('mongoskin');
    db = mongo.db(process.env.MONGOHQ_URL || "mongodb://sanketidictionary:sanketidictionaryreadonly@msscombocluster-shard-00-00.atj3m.mongodb.net:27017,msscombocluster-shard-00-01.atj3m.mongodb.net:27017,msscombocluster-shard-00-02.atj3m.mongodb.net:27017/heroku_6rcwvxcv?ssl=true&replicaSet=atlas-3tzz6w-shard-0&authSource=admin&retryWrites=true&w=majority", {
        safe: true
    });
    dictionary = db.collection("dictionary");
    users = db.collection("users");
    Y.namespace("mojito").sankethiDictionaryMongo = {
        dictionary : dictionary,
        users : users
    };

}, '0.0.1', {
    requires: ['mojito-params-addon']
});
