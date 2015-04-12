(function(Backbone, Marionette, $, _, Views, Entity ){
    'use strict';

    var Routes =  window.Routes || {};
    window.Routes = Routes;

    Routes.BaseFilter = Marionette.Object.extend({
        constructor: function(){
            Marionette.Object.apply(this, arguments);
            this.projectChannel = Backbone.Radio.channel('project');
        },
        onBeforeExecute: function(route){},
        onError: function(){}
    });

    Routes.LoginFilter = Routes.BaseFilter.extend({
        onBeforeExecute: function(route){
            var loginState = this.projectChannel.request("login");
            return loginState;
        },
        onError: function(){
            this.projectChannel.command("403");
        }
    });

    Routes.PageReportFilter = Routes.BaseFilter.extend({
        initialize: function(options){
            this.name = options.name;
        },
        onBeforeExecute: function(route){
            this.projectChannel.command("page", this.name);
            return true;
        }
    });

    Routes.BaseRoute = Marionette.View.extend({
        constructor: function(options) {
            if(options.channel) {
                this.channel = options.channel;
            }
            if(options.container) {
                this.container = options.container;
            }

            if(options.filters){
                this.filters = options.filters;
            }
            else if(!this.filters){
                this.filters = [];
            }

            Marionette.View.apply(this, arguments);
        },
        fetch: function(){},
        onFetch: function(){},
        render: function(){},
        enter: function(){return this;},
        execute: function(options){
            var self = this;
            for( var i = 0; i< this.filters.length; ++i){
                var filter = this.filters[i];
                var result = filter.onBeforeExecute(self);
                if(!result){
                    filter.onError(self);
                    return;
                }
            }
            return $.when(this.fetch(options))
                .done(function(){self.onFetch.apply(self, arguments);})
                .done(function(){return self.enter(options);});
        },
        leave: function(){
            this.stopListening();
        }
    });
})(window.Backbone, window.Marionette, window.jQuery, window._, window.Views, window.Entity);
