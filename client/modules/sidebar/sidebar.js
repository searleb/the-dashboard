// Run the tooltips when the template is rendered.
Template.sidebar.onRendered(function (argument) {
    $('.iconav [data-toggle="tooltip"]').tooltip();
});

// If the user is not logged in, wait 500ms after login to initialize the hidden tooltips.
Tracker.autorun(function(){
    if(Meteor.userId()){
        setTimeout(function () {
            $('.iconav [data-toggle="tooltip"]').tooltip();
        }, 500);
    }
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
