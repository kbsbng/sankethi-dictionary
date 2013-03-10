/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('AddWordBinderIndex', function(Y, NAME) {

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
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var me = this;
            this.node = node;
            node.all('input[name="new-word-type"]').on('click', function(e) {
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
                return;
            });
            window.onload = function() {
                pramukhIME.addLanguage(PramukhIndic, "kannada");
                pramukhIME.enable();
            };
            /**
             * Example code for the bind method:
             *
             * node.all('dt').on('mouseenter', function(evt) {
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).addClass('sel');
             *
             * });
             * node.all('dt').on('mouseleave', function(evt) {
             *   
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).removeClass('sel');
             *
             * });
             */
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
