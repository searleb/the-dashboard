Tracker.autorun(function(){
   if ( Meteor.user() ) {
      Meteor.call('getHours', function (err, data) {
         console.log(data);
         Session.set('allTrackedHours', data);
      });
   }
});

Template.hoursTracker.helpers({
   loggedHours: function() {
      var hours =  Session.get('allTrackedHours');
      //   $(hours).each(function(index, el) {
      //       if (el.hours < 7) {
      //           el.class = "not-complete";
      //       } else if ( el.hours >= 8){
      //           el.class = "complete";
      //       }
      //   });
      return hours;
   },
   dates: function(){
      var startOfWeek = moment().startOf('month');
      var endOfWeek = moment();

      var days = [];
      var day = startOfWeek;

      while (day <= endOfWeek) {
         console.log(day.format('D '));
         days.push(day.format('D'));
         day = day.clone().add(1, 'day');
      }
      // console.log(days);
      return days;
   }
});
