YUI.add('addons-viewengine-jade', function (Y, NAME) {
    "use strict";

    var fs, jade, compiledTemplates;
    fs = require('fs');
    jade = require('jade');
    function JadeAdapter(viewId) {
        this.viewId = viewId;
    }

    compiledTemplates = {};

    JadeAdapter.prototype = {
        render: function (data, mojitType, tmpl, adapter, meta, more) {
            tmpl = tmpl["content-path"];
            var compiledTmpl = compiledTemplates[tmpl];
            data.meta = meta.view;
            if (compiledTmpl === undefined) {
                this.compileAsync(tmpl, function (compiledTmpl) {
                    compiledTemplates[tmpl] = compiledTmpl;
                    if (more === true) {
                        adapter.flush(compiledTmpl(data), meta);
                    } else {
                        adapter.done(compiledTmpl(data), meta);
                    }
                });
                return;
            }
            if (more === true) {
                adapter.flush(compiledTmpl(data), meta);
            } else {
                adapter.done(compiledTmpl(data), meta);
            }
        },
        compileAsync: function (tmpl, cb) {
            Y.log("Asynchrounous compile for jade tmpl called: " + JSON.stringify(tmpl), "debug", NAME);
            fs.readFile(tmpl, 'utf-8', function (err, data) {
                if (err) {
                    throw err;
                }
                cb(jade.compile(data, {filename: tmpl}));
            });
        }
    };
    Y.namespace('mojito.addons.viewEngines').jade = JadeAdapter;
}, '0.1.0', {requires: []});
