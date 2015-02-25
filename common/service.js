(function(Backbone, Marionette, $ ){
    'use strict';

    var Service =  window.Service|| {};
    window.Service = Service;

    Service.BaseService = Marionette.Object.extend({
        constructor: function(options) {
            if (this.name) {
                this.channel = Backbone.Radio.channel(this.name);
            }
            Marionette.Object.apply(this, arguments);
        }
    });
})(window.Backbone, window.Marionette, window.jQuery);
