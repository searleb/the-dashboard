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

Meteor.publish("userData", function () {
   if (this.userId) {
      return Meteor.users.find({_id: this.userId},
         { fields: {
            'services.google.picture': 1,
            'services.google.accessToken': 1,
            'services.google.email': 1 }
         });
      } else {
         this.ready();
      }
   });
