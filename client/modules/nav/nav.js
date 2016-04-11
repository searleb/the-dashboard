// Run the tooltips when the template is rendered.
Template.nav.onRendered(function (argument) {
   $('.iconav [data-toggle="tooltip"]').tooltip();

   (function isNewTab() {
      var list = $('.iconav-slider .iconav-nav').children('li');
      $(list).each(function(index, el) {
         $this = $(el);
         var attr = $(el).children('a').attr('target');
         if (attr == '_blank') {
            $this.addClass('new-tab');
         }
      });
   })();
});

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
