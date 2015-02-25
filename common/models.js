(function(Backbone, Marionette, Utils, _){
    'use strict';
    var Entity =  window.Entity || {};
    window.Entity = Entity;

    Entity.BaseModel = Backbone.Model.extend({ });

    Entity.BaseCollection = Backbone.Collection.extend({
        model: Entity.BaseModel
    });

})(window.Backbone, window.Marionette, window.Utils, window._);

