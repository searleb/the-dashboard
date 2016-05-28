Tracker.autorun(function(){
   if ( Meteor.user() ) {
      Meteor.call('getHours', function (err, data) {
         Session.set('allTrackedHours', data);
      });
   }
});

Template.hoursTracker.helpers({
   loggedHours: function() {
      var hours =  Session.get('allTrackedHours');
      console.log(hours);
      return hours;
   }
});
