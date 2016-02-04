Template.login.events({
   'click #login': function(){
      Meteor.loginWithGoogle({
         requestPermissions:
         ['https://www.googleapis.com/auth/calendar', 'email', 'openid'],
         requestOfflineToken: {
            google: true
         },
         forceApprovalPrompt: {
            google: true
         }
      }, function(err) {
         console.log(err);
         if (err.error == 403) {
            alert("Sorry " + err.message.toLowerCase());
         }
      });
   },
   'click #logout': function(){
      Accounts.logout();
   }
});

Template.login.helpers({
   loginService: function(){
      return Accounts.loginServicesConfigured();
   }
});
