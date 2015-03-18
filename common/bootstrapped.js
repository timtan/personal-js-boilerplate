(function(Backbone, Marionette, Views, _){
    'use strict';
    Views.BootstrapSimpleModal = Views.LayoutView.extend({   // this one is not so good
        template:
            _.template('<div class="modal fade" data-js="modal">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content" data-content>' + '</div>' +
                '</div>' +
            '</div>'),
        regions: {
            content: '[data-content]'
        },
        ui:{
            modalRegion:'[data-js=modal]'
        },
        modalOption:{},
        // accept a  view to show, or you just replace it;
        initialize: function(options){
           this.view = options.view;
        },
        onBeforeShow: function(){
            this.getRegion("content").show(this.view);
        },
        onShow: function(){
            this.ui.modalRegion.modal(_.result(this.modalOption));
        },
        onBeforeDestroy: function(){
            //this.getRegion("content").empty();
        }
    });


    Views.BootstrapModalRegion = Marionette.Region.extend({ // this is relatively very nice
        attachHtml: function(view){
            this.$el.addClass("modal fade");
            this.$el.css("display", "block");
            view.$el.addClass("modal-dialog");
            this.$el.html(view.el);
            this.$el.modal("show");
        },
        onEmpty: function(view, region){
            this.$el.modal('hide');
        }
    });
})(window.Backbone, window.Marionette, window.Views, window._ );
