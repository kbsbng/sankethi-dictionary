/*jslint anon:true, sloppy:true, nomen:true*/
/*global pramukhIME*/
/*global PramukhIndic*/
YUI.add('AddWordBinderIndex', function (Y, NAME) {

    /**
     * The AddWordBinderIndex module.
     *
     * @module AddWordBinderIndex
     */

    /**
     * Constructor for the AddWordBinderIndex class.
     *
     * @class AddWordBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function (mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        addVariations: function (node, obj, type) {
            var variations, rows;
            if (type === "noun" || type === "pronoun") {
                rows = node.all("#noun-variations tr");
            } else if (type === "verb") {
                rows = node.all("#verb-variations tr");
            } else {
                return;
            }
            variations = [];
            // ignore the header row
            rows.shift();
            rows.each(function (row) {
                variations.push(row.all("input").get("value"));
            });
            obj.entry.variations = variations;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function (node) {
            console.log(JSON.stringify(this.mojitProxy.config));
            var me = this, meanings = 1;
            this.node = node;
            node.one("#add-meaning").on('click', function () {
                var newMeaning;
                meanings += 1;
                newMeaning = Y.Node.create('<label for="new-word-meaning-' + meanings + '">Meaning ' + meanings +
                    '</label><input name="new-word-meaning-' + meanings + '" id="new-word-meaning-' + meanings +
                    '" class="new-word-meanings"/>');
                node.one("#meanings").insert(newMeaning, node.one("#add-meaning"));
            });
            node.all('input[name="new-word-type"]').on('click', function (e) {
                var type = e.target.get('value');
                if (type === "noun" || type === "pronoun") {
                    node.one("#verb-variations").setStyle("display", "none");
                    node.one("#noun-variations").setStyle("display", "block");
                    return;
                }
                if (type === "verb") {
                    node.one("#noun-variations").setStyle("display", "none");
                    node.one("#verb-variations").setStyle("display", "block");
                    return;
                }
                node.one("#verb-variations").setStyle("display", "none");
                node.one("#noun-variations").setStyle("display", "none");
            });
            node.one("#add-word-button").on("click", function () {
                var word, wordType;
                wordType = node.one('input[name="new-word-type"]:checked').get("value");
                word = {
                    "word": node.one("#new-word").get("value"),
                    "entry": {
                        "type": wordType,
                        "meanings": node.all('.new-word-meanings').get("value")
                    }
                };
                Y.log(JSON.stringify(word), "info", NAME);
                me.addVariations(node, word, wordType);
                me.mojitProxy.invoke("addWord", {
                    params: {
                        body: {
                            newWord: JSON.stringify(word)
                        }
                    }
                }, function (error, markup) {
                    console.log(markup);

                    node.one(".notification").set('innerHTML', "Added word " + word.word);
                    node.one("form").reset();
                });
            });
            window.onload = function () {
                pramukhIME.addLanguage(PramukhIndic, "kannada");
                pramukhIME.enable();
            };
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client', "io-base"]});
