(function(Backbone, Marionette){
    'use strict';
    /* reference http://stackoverflow.com/questions/9810335/how-to-change-facebook-login-button-with-my-custom-image */
    var Utils = window.Utils || {};
    window.Utils = Utils;

    var $ = Backbone.$;

    Utils.FacebookHelper = function(options) {
        this.deferred = $.Deferred();
        var self = this;

        options = options || {
            appId      : options.appID || '1433288343571864',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.1' // use version 2.1
        };

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


    };
    Utils.FacebookHelper.prototype.ready = function(callback){
        if(callback){
            this.deferred.done(callback);
        }
        return this.deferred.promise();
    };
    Utils.FacebookHelper.prototype.loginAndFetchingData= function(callback){
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
            scope: 'publish_stream,email'
        });

        return $fetchData.promise();
    };

})(window.Backbone, window.Marionette);

