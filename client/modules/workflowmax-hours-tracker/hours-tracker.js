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
      var hours = Session.get('allTrackedHours');
      return hours;
   },
   dates: function() {
      var dates = Session.get('allTrackedDates');
      return dates;
   }
});

Template.hoursTracker.events({
   "click .syd"(e){
      Meteor.call('getHours', 'sydney', function (err, data) {
         Session.set('allTrackedHours', data);
      });
      Meteor.call('getTrackedDates', function (err, data) {
         Session.set('allTrackedDates', data);
      });
   },
   "click .ldn"(e){
      Meteor.call('getHours', 'london', function (err, data) {
         Session.set('allTrackedHours', data);
      });
      Meteor.call('getTrackedDates', function (err, data) {
         Session.set('allTrackedDates', data);
      });
   },
});
