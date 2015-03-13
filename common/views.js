(function(Backbone, Marionette,_ ){
    'use strict';
    var Views =  window.Views || {};
    window.Views = Views;

    var extraViewOptions = [
        "channel"
    ];

    Views.ItemView= Marionette.ItemView.extend({
        constructor: function(options) {
            options = options || {};
            _.extend(this, _.pick(options, extraViewOptions));
            Marionette.ItemView.apply(this, arguments);
        }
    });
    Views.CollectionView = Marionette.CollectionView.extend({
        childViewOptions: function(model, index) {
            return {
                channel: this.channel
            };
        },
        constructor: function(options) {
            options = options || {};
            _.extend(this, _.pick(options, extraViewOptions));
            Marionette.CollectionView.apply(this, arguments);
        }
    });
    Views.CompositeView = Marionette.CompositeView.extend({
        childViewOptions: function(model, index) {
            return {
                channel: this.channel
            };
        },
        constructor: function(options) {
            options = options || {};
            _.extend(this, _.pick(options, extraViewOptions));
            Marionette.CompositeView.apply(this, arguments);
        }
    });
    Views.LayoutView = Marionette.LayoutView.extend({
        constructor: function(options) {
            options = options || {};
            _.extend(this, _.pick(options, extraViewOptions));
            Marionette.LayoutView.apply(this, arguments);
        }
    });

})(window.Backbone, window.Marionette, window._ );
