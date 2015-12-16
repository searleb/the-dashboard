Template.settingsModal.onCreated(function () {
    this.autorun(function (argument) {
        var userData = Meteor.user();
        if (userData) {
            Session.set('userRole', userData.profile.role);
            Session.set('userOffice', userData.profile.office);
        }
    });
});

Template.settingsModal.helpers({
    userData: function(){
        return Meteor.user();
    },
    sydChecked: function(){
        var userData = Session.get('userOffice');
        var checked = false;
        if (userData == "sydney") {
            checked = true;
        }
        return checked;
    },
    ldnChecked: function(){
        var userData = Session.get('userOffice');
        var checked = false;
        if (userData == "london") {
            checked = true;
        }
        return checked;
    },
    attributes: function (e) {
        // {{attributes val=""}} check the radio button is this button matches the users saved role
        var userRole = Session.get('userRole');
        var condition = e.hash.val;
        if (userRole == condition) {
            return {
                checked: true
            };
        }
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
        // save the users role to their profile, so this data is maintained on reload
        Meteor.call('saveUserRole', usersRole);
        // also set a session varible which the tools template watching for changes and updates the page when the settings are changes
        Session.set('userRole', usersRole);
    }
});
