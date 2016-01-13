// Run the tooltips when the template is rendered.
Template.sidebar.onRendered(function (argument) {
    $('.iconav [data-toggle="tooltip"]').tooltip();

    (function isNewTab() {
        var list = $('.iconav-slider .iconav-nav').children('li');
        $(list).each(function(index, el) {
            console.log(index, el);
        });
    })();
});

Template.sidebar.helpers({
    userData: function(){
        return Meteor.user();
    }
});

Template.sidebar.events({
    'click #user-settings' : function (e) {
        e.preventDefault();
        $('#settings-modal').modal();
    }
});
