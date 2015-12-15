Template.settingsModal.helpers({
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
    role: function () {
        var userData = Meteor.user();
        return userData.profile.role;
    }
});

Template.settingsModal.events({
    'click #user-settings' : function (e) {
        e.preventDefault();
        $('#settings-modal').modal();
    },
    'change #user-office input[name="office"]' : function (e) {
        var usersOffice = $(e.currentTarget).val();
        Meteor.call('saveUserOffice', usersOffice);
    },
    'change #user-role input[name="role"]' : function (e) {
        var usersRole = $(e.currentTarget).val();
        Meteor.call('saveUserRole', usersRole);
    }
});
