YUI.add('UsersModel', function (Y, NAME) {
    "use strict";
    var mongo;
    mongo = Y.mojito.sankethiDictionaryMongo;
    Y.namespace('mojito.models')[NAME] = {
        init: function (config) {
            this.config = config;
        },

        ensureUserExists: function (user, cb) {
            if (cb === undefined) {
                cb = function () {
                    //Y.log(result, "debug", NAME);
                };
            }
            Y.log("Ensuring that user " + user.email + " with name " + user.name + " exists", "info", NAME);
            mongo.users.update({
                "_id": user.email
            }, {
                "$set": {
                    "name": user.name
                }
            }, {
                upsert: true
            }, function (err, result) {
                if (err !== null) {
                    Y.log(err, "error", NAME);
                }
                cb(err, result);
            });
        }
    };
}, '0.0.1', {requires: ["sankethi-dictionary-mongo"]});