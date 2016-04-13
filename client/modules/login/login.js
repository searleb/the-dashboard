Template.login.events({
   'click #login-btn': function(){
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
   }
});

Template.login.helpers({
   loginService: function(){
      return Accounts.loginServicesConfigured();
   }
});
