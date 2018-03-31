YUI.add('sankethi-dictionary-mongo', function (Y) {
    "use strict";
    var mongo, db, dictionary, users;
    mongo = require('mongoskin');
    db = mongo.db(process.env.MONGOHQ_URL || "mongodb://sanketidictionary:sanketidictionaryreadonly@ds047612.mlab.com:47612/heroku_vcjz23l3", {
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
