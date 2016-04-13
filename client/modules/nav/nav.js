// Run the tooltips when the template is rendered.
Template.nav.helpers({
   userData: function(){
      return Meteor.user();
   }
});

Template.nav.events({
   'click #user-settings' : function (e) {
      e.preventDefault();
      $('#settings-modal').modal();
   },
   'click #login-out': function(){
      if ( Meteor.userId() ) {
         Meteor.logout();
      } else {
         Meteor.loginWithGoogle();
      }
   }
});
