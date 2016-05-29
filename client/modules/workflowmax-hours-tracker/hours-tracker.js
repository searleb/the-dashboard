Tracker.autorun(function(){
   if ( Meteor.user() ) {
      Meteor.call('getHours', function (err, data) {
         Session.set('allTrackedHours', data);
      });
      Meteor.call('getTrackedDates', function (err, data) {
         Session.set('allTrackedDates', data);
      });
   }
});

Template.hoursTracker.helpers({
   loggedHours: function() {
      var hours =  Session.get('allTrackedHours');
      console.log(hours);
      return hours;
   },
   dates: function() {
      var dates =  Session.get('allTrackedDates');
      console.log(dates);
      return dates;
   }
});
