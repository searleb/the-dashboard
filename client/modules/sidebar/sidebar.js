Template.sidebar.onRendered(function (argument) {
    $('.iconav [data-toggle="tooltip"]').tooltip();
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
