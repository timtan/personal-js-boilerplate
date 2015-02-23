(function(Backbone, Marionette, _, FilteredCollection){
    'use strict';
    var Views =  window.Views || {};
    window.Views = Views;

    Views.ItemView= Marionette.ItemView.extend({  });
    Views.CollectionView = Marionette.CollectionView.extend({ });
    Views.CompositeView = Marionette.CompositeView.extend({ });
    Views.LayoutView = Marionette.LayoutView.extend({ });

})(window.Backbone, window.Marionette, window._, window.FilteredCollection);
