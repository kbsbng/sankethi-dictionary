/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('AddWordPageModelFoo', function(Y, NAME) {

/**
 * The AddWordPageModelFoo module.
 *
 * @module AddWordPage
 */

    /**
     * Constructor for the AddWordPageModelFoo class.
     *
     * @class AddWordPageModelFoo
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
        getData: function(callback) {
            callback(null, { some: 'data' });
        }

    };

}, '0.0.1', {requires: []});
