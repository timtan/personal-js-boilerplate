(function(Backbone, Marionette){
    'use strict';
    var Utils = window.Utils || {};
    window.Utils = Utils;

    Utils.imageCheck = function(possibleUrl, successCallback){
        window.$('<img/>').attr('src', possibleUrl).load(function() {
            window.$(this).remove(); // prevent memory leaks as @benweet suggested
            successCallback();
        });
    };

})(window.Backbone, window.Marionette);

