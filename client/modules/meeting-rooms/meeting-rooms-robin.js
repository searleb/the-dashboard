Template.meetingRooms.onCreated(function(){
   // onCreated we call for all the rooms details and set it into Session
   var roomsComplete;
   function getRooms() {
      var robinFeed = Meteor.call('getRobinRooms', function (err, data) {
         if (err) {
            Session.set('meetingRooms', err);
         } else {
            Session.set('meetingRooms', data);
            // this is garbage
            //    roomsComplete = data;
            //    console.log(roomsComplete);
            //    var rooms = data;
            //    _.each(rooms, function (room) {
            //       var id = room.space.id;
            //       Meteor.call('whatsFree', id, function (err, data) {
            //          if (err) {
            //             console.log(err);
            //          } else {
            //             roomsComplete.whatsFree = data;
            //             console.log(roomsComplete);
            //          }
            //       });
            //    });
            //    Session.set('meetingRooms', roomsComplete);
         }
      });
   }

   // call getRooms and update every 5 minutes
   Meteor.setInterval(function(){
      if (tabIsFocused) {
         getRooms();
      }
   }, 1000 * 30);

   getRooms();
});


Template.meetingRooms.onRendered(function () {
   // updates progress bar
   function getProgress(start, end, id){
      var now = moment();
      var starting = moment(start);
      var ending = moment(end);

      if (starting <= now && ending >= now) {
         var duration = ending - starting;
         var progress = now - starting;
         var percentage = (progress / duration) * 100;

         Session.set('progress-percent' + id, percentage);
      }
   }

   // checks if booking is in session
   function getIsSession(start, end, id) {
      var now = moment();
      var starting = moment(start);
      var ending = moment(end);

      if (starting <= now && ending >= now) {
         Session.set('is-session-class' + id, 'in-session');
      } else {
         Session.set('is-session-class' + id, 'not-in-session');
      }
   }

   // checks if booking is tomorrow
   function getIsTomorrow(start, end, id) {
      var tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');
      var starting = moment(start).format('YYYY-MM-DD');

      if (moment(tomorrow).isAfter(starting)) {
         Session.set('is-tomorrow-class' + id, 'today');
      } else {
         Session.set('is-tomorrow-class' + id, 'tomorrow');
      }
   }

   // loop each rooms bookings and update the progress bar and check is in session
   function updateBooking() {
      var rooms = Session.get('meetingRooms');
      _.each(rooms, function (room) {
         _.each(room.bookings, function (booking) {
            var start = booking.started_at,
            end = booking.ended_at,
            id = booking.id;

            getProgress(start, end, id);
            getIsSession(start, end, id);
            getIsTomorrow(start, end, id);
         });
      });
   }

   Meteor.setInterval(function(){
      if (tabIsFocused) {
         updateBooking();
      }
   }, 1000 * 5);
   updateBooking();

});


Template.meetingRooms.helpers({
   room: function () {
      return Session.get('meetingRooms');
   },
   // returns a % progress number
   progressPercent: function(id){
      var perc = Session.get('progress-percent' + id);
      if (perc) {
         return perc;
      } else{
         return 0;
      }
   },
   // returns a class name if the booking is in session or not
   isInSession: function (id) {
      return Session.get('is-session-class' + id);
   },
   isTomorrow: function (id) {
      return Session.get('is-tomorrow-class' + id);
   }
   // whatsFree: function(id) {
   //    console.log(id, Session.get('whatsFree' + id));
   //    return Session.get('whatsFree');
   // }
});
