// restrict signups to only @mentallyfriendly.com email addresses
Meteor.startup(function () {
    Accounts.config({
        restrictCreationByEmailDomain: 'mentallyfriendly.com'
    });
});

Meteor.methods({
    'saveUserOffice': function(office) {
        var user = Meteor.user();
        Meteor.users.update({_id: Meteor.user()._id}, {$set: {"profile.office": office}});
    },
    'saveUserRole': function(role) {
        var user = Meteor.user();
        Meteor.users.update({_id: Meteor.user()._id}, {$set: {"profile.role": role}});
    }
});
