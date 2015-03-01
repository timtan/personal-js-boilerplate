(function(Backbone, Marionette){
    'use strict';
    /* reference https://developers.google.com/youtube/iframe_api_reference */
    /* use deferred to check youtube availability  */
    var Utils = window.Utils || {};
    window.Utils = Utils;

    var $ = Backbone.$;
    Utils.YoutubeHelper = function() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.youtubeAvailable = false;
    };
    Utils.YoutubeHelper.prototype.ready= function(callback){
        var deferred = $.Deferred();

        if(callback){
            $.when(deferred).done(callback);
        }

        var self = this;
        if(self.youtubeAvailable){
            deferred.resolve();
        }
        else{
            var check = function(){
                if(window.YT ){ // if you have YT.player, you can use iframe api with js
                    self.youtubeAvailable = true;
                    deferred.resolve();
                }
                else{
                    setTimeout(check, 500);
                }
            };
            setTimeout(check, 500);
        }
        return deferred.promise();
    };

})(window.Backbone, window.Marionette);

