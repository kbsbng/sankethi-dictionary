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
//            Y.log("data: " + JSON.stringify(data));
//            Y.log("mojitType: " + JSON.stringify(mojitType));
//            Y.log("tmpl: " + JSON.stringify(tmpl));
//            Y.log("adapter: " + JSON.stringify(adapter));
//            Y.log("meta: " + JSON.stringify(meta));
            var compiledTmpl = compiledTemplates[tmpl];
            data.meta = meta.view;
            if (compiledTmpl === undefined) {
//                compiledTemplates[tmpl] = this.compiler(tmpl);
//                compiledTmpl = compiledTemplates[tmpl];
//                console.log(compiledTmpl(data));
//                if (more === true) {
//                    adapter.flush(compiledTmpl(data), meta);
//                } else {
//                    adapter.done(compiledTmpl(data), meta);
//                }
                this.compileAsync(tmpl, function (compiledTmpl) {
                    compiledTemplates[tmpl] = compiledTmpl;
                    console.log(compiledTmpl(data));
                    if (more === true) {
                        adapter.flush(compiledTmpl(data), meta);
                    } else {
                        adapter.done(compiledTmpl(data), meta);
                    }
                });
                return;
            }
            console.log(compiledTmpl(data));
            if (more === true) {
                Y.log("Flushing");
                adapter.flush(compiledTmpl(data), meta);
            } else {
                Y.log("Jade templ done");
                adapter.done(compiledTmpl(data), meta);
            }
        },
        compiler: function (tmpl) {
            Y.log("jade compiler called", "debug", NAME);
            return jade.compile(fs.readFileSync(tmpl, 'utf8'), {filename: tmpl});
            //return fs.readFileSync(tmpl, 'utf8');
        },
        compileAsync: function (tmpl, cb) {
            Y.log("Asynchrounous compile for jade tmpl called: " + JSON.stringify(tmpl), "debug", NAME);
            fs.readFile(tmpl, 'utf-8', function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(data);
                cb(jade.compile(data, {filename: tmpl}));
            });
        }
    };
    Y.namespace('mojito.addons.viewEngines').jade = JadeAdapter;
}, '0.1.0', {requires: []});
