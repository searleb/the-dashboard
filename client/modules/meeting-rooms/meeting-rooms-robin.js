
Template.meetingRooms.onCreated(function(){
   function getRooms() {
      console.log('getRooms');
      var robinFeed = Meteor.call('getRobinRooms', function (err, data) {
         if (err) {
            Session.set('meetingRooms', err);
         } else {
            Session.set('meetingRooms', data);
            console.log(data);
         }
      });

   }

   // call getRooms and update every 5 minutes
   Meteor.setInterval(function(){
      getRooms();
   }, (1000 * 60) * 5);

   getRooms();

});

Template.roomsCalendar.helpers({
   allBookings: function() {
      var rooms = Session.get('meetingRooms');
      var events = [];

      _.each(rooms, function (room) {
         _.each(room.bookings, function (booking) {
            var obj = {
               title: booking.location + " - " + booking.title,
               start: moment(booking.started_at).format(),
               end: moment(booking.ended_at).format(),
               allDay: booking.is_all_day
            };
            events.push(obj);
            // console.log(events);
         });
      });
      console.log(events);

      return {
         defaultView: 'agendaDay',
         minTime: '07:00',
         maxTime: '21:00',
         slotEventOverlap: false,
         events: events
      };
   }
});

Template.meetingRooms.helpers({
   room: function () {
      return Session.get('meetingRooms');
   },
   // returns a percentage progress of the current booking
   progress: function(start, end, id){
      function getProgress(){
         var now = moment();
         var starting = moment(start);
         var ending = moment(end);

         if (starting <= now && ending >= now) {
            var duration = ending - starting;
            var progress = now - starting;
            var percentage = progress / duration * 100;

            Session.set('progress-percent' + id, percentage);
         }
      }

      getProgress();
      Meteor.setInterval(function(){
         getProgress();
      }, 1000 * 30);

      return Session.get('progress-percent' + id);
   },
   // returns a class name if the booking is in session or not
   isInSession: function (start, end, id) {
      function getIsSession() {
         var now = moment();
         var starting = moment(start);
         var ending = moment(end);
         var className;
         if (starting <= now && ending >= now) {
            Session.set('is-session-class' + id, 'in-session');
         } else {
            Session.set('is-session-class' + id, 'not-in-session');
         }
      }

      getIsSession();
      Meteor.setInterval(function () {
         getIsSession();
      }, 1000 * 30);

      return Session.get('is-session-class' + id);
   },
   whatsFree: function () {
      var robinFeed = Meteor.call('whatsFree', function (err, data) {
         Session.set('whatsFree', data);
      });
      var test = Session.get('whatsFree');
      console.log(test);
      return Session.get('whatsFree');
   }
});
