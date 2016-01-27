Template.login.events({
   'click #login': function(){
      Meteor.loginWithGoogle({
         requestPermissions:
            ['https://www.googleapis.com/auth/calendar', 'email', 'openid']
         ,
         requestOfflineToken: {
            google: true
         },
         forceApprovalPrompt: {
            google: true
         }
      });
   },
   'click #logout': function(){
      Accounts.logout();
   }
});
