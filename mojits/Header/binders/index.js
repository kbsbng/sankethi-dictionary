/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('HeaderBinderIndex', function(Y, NAME) {

    function turnOnMenu(node) {
        node.addClass("on");
    }

    function turnOffMenu(node) {
        node.removeClass("on");
    }
/**
 * The HeaderBinderIndex module.
 *
 * @module HeaderBinderIndex
 */

    /**
     * Constructor for the HeaderBinderIndex class.
     *
     * @class HeaderBinderIndex
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
            var me = this, menuEnable, menuDisable;
            this.node = node;

            menuEnable = function(e) {
                var menu = e.target;
                menu.addClass("on");
                menu.once("click", menuDisable);
            };

            menuDisable = function(e) {
                var menu = e.target;
                menu.removeClass("on");
                menu.once("click", menuEnable);
            };

            node.all(".menu").once("click", menuEnable);
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
