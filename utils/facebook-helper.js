(function(Backbone, Marionette, _){
    'use strict';
    /* reference http://stackoverflow.com/questions/9810335/how-to-change-facebook-login-button-with-my-custom-image */
    var Utils = window.Utils || {};
    window.Utils = Utils;

    var $ = Backbone.$;

    var FacebookHelperBase = Marionette.Object.extend({
        constructor: function(options){
            this.deferred = $.Deferred();
            var self = this;
            this.options = _.extend({
                appId      : '1433288343571864',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.1', // use version 2.1
                scope: 'publish_stream,email,user_friends'
            }, options);

            window.fbAsyncInit = function() {
                window.FB.init(options);
                self.deferred.resolve();
            };

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)){
                    return;
                }
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/all.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            Marionette.Object.apply(this, arguments);
        }
    });

    FacebookHelperBase.prototype.getFBLoginUrl= function(){
        return  "https://www.facebook.com/dialog/oauth?client_id="  +
            this.options.appId +
            "&response_type=token&scope=" + this.options.scope +
            "&redirect_uri=" + this.options.callBackUrl;
    };

    FacebookHelperBase.prototype.ready = function(callback){
        if(callback){
            this.deferred.done(callback);
        }
        return this.deferred.promise();
    };


    Utils.FacebookHelper = FacebookHelperBase.extend({
        constructor: function(options){
            FacebookHelperBase.apply(this, arguments);
        }
    });

    Utils.FacebookHelper.prototype.loginAndFetchingData = function(callback){
        var data = {};
        var $fetchData = $.Deferred();

        if(callback) {
           $fetchData.done(callback);
        }

        window.FB.login(function(response) {
            if (response.authResponse) {
                window.console.log('Welcome!  Fetching your information.... ');
                //console.log(response); // dump complete info
                data.access_token = response.authResponse.accessToken; //get access token
                data.user_id = response.authResponse.userID; //get FB UID

                window.FB.api('/me', function(response) {
                    data.email = response.email; //get user email
                    data.name = response.name;
                    // you can store this data into your database
                    $fetchData.resolve(data);
                });
            } else {
                //user hit cancel button
                window.console.log('User cancelled login or did not fully authorize.');
                $fetchData.reject();

            }
        }, {
            scope: 'publish_stream,email,user_friends'
        });

        return $fetchData.promise();
    };



    Utils.RedirectedFacebookHelper = FacebookHelperBase.extend({
        initialize: function(options){
            this.options.callBackUrl = options.callBackUrl;
            this.options.scope ='publish_stream,email,user_friends';
        }
    });


    Utils.RedirectedFacebookHelper.prototype.loginAndFetchingData = function(){
        location.href = this.getFBLoginUrl();
    };

    Utils.RedirectedFacebookHelper.prototype.backboneRouteString = "access_token=:token&expires_in:time";
    Utils.RedirectedFacebookHelper.prototype.getUserData = function(access_token){
        var $deferred = $.Deferred();
        this.access_token = access_token;
        var data = {
            access_token: this.access_token
        };
        window.FB.api('/me',  function(response) {
            data.email = response.email; //get user email
            data.name = response.name;
            data.user_id = response.id; //get FB UID
            $deferred.resolve(data);
        },{access_token: this.access_token});
        return $deferred.promise();
    };


})(window.Backbone, window.Marionette, window._);

