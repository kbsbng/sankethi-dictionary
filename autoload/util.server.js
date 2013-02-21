YUI.add('sankethi-dictionary-util', function (Y) {
    "use strict";
    var fs, mockUserData = {
        "1": {name: "Keshavaprasad B S", email: "kbsbng@gmail.com"},
        "2": {name: "Smitha", email: "smitha.srikumar1@gmail.com"}
    };
    fs = require("fs");
    Y.mojito.sankethiDictionaryUtils = {
        getUserName: function (ac) {
            return this.getUserObj(ac).name;
        },
        getUserEmail: function (ac) {
            return this.getUserObj(ac).email;
        },
        getUserObj: function (ac) {
            if (process.env.ENV === "dev") {
                //noinspection JSLint
                var user = fs.readFileSync("./userData.txt").toString();
                return mockUserData[user];
            }
            //noinspection JSLint
            return ac._adapter.req.getAuthDetails().user;
        }
    };
}, '0.0.1', {
    requires: ['mojito-params-addon']
});
