Template.sidebar.onRendered(function (argument) {
    $('.iconav [data-toggle="tooltip"]').tooltip();
});

Template.sidebar.helpers({
    userData: function(){
        return Meteor.user();
    },
    sydChecked: function(){
        var userData = Meteor.user();
        var checked = false;
        if (userData.profile.office == "sydney") {
            checked = true;
        }
        return checked;
    },
    ldnChecked: function(){
        var userData = Meteor.user();
        var checked = false;
        if (userData.profile.office == "london") {
            checked = true;
        }
        return checked;
    },
});

Template.sidebar.events({
    'click #user-settings' : function (e) {
        e.preventDefault();
        $('#settings-modal').modal();
    },
    'change, [name]office' : function (e) {
        var usersOffice = $(e.currentTarget).val();
        Meteor.call('saveUserOffice', usersOffice);
    }
});
