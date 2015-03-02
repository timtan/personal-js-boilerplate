(function(Backbone, Marionette, $, _, Views, Entity ){
    'use strict';

    var Routes =  window.Routes || {};
    window.Routes = Routes;

    Routes.BaseRoute = Marionette.View.extend({
        constructor: function(options) {
            if (options.channel) {
                this.channel = options.channel;
            }
            if (options.container) {
                this.container = options.container;
            }
            Marionette.View.apply(this, arguments);
        },
        fetch: function(){},
        onFetch: function(){},
        render: function(){},
        enter: function(){return this;},
        execute: function(options){
            var self = this;
            return $.when(this.fetch(options))
                .done(function(){self.onFetch.apply(self, arguments);})
                .done(function(){return self.enter(options);});
        },
        leave: function(){
            this.stopListening();
        }
    });
})(window.Backbone, window.Marionette, window.jQuery, window._, window.Views, window.Entity);
