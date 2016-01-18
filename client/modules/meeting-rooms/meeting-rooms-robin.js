Template.meetingRooms.onCreated(function(){
   // onCreated we call for all the rooms details and set it into Session
   function getRooms() {
      var robinFeed = Meteor.call('getRobinRooms', function (err, data) {
         if (err) {
            Session.set('meetingRooms', err);
         } else {
            Session.set('meetingRooms', data);
         }
      });
   }

   // call getRooms and update every 5 minutes
   Meteor.setInterval(function(){
      if (tabIsFocused) {
         getRooms();
      }
   }, (1000 * 60) * 5);

   getRooms();
});


Template.meetingRooms.onRendered(function () {
   // add event listener to window to check if window is in focus
   tabIsFocused = true;
   window.addEventListener('focus', function() {
      tabIsFocused = true;
   },false);

   window.addEventListener('blur', function() {
      tabIsFocused = false;
   },false);

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
      var className;
      if (starting <= now && ending >= now) {
         Session.set('is-session-class' + id, 'in-session');
      } else {
         Session.set('is-session-class' + id, 'not-in-session');
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
         });
      });
   }

   Meteor.setInterval(function(){
      if (tabIsFocused) {
         updateBooking();
      }
   }, 1000 * 2);
   updateBooking();

});


Template.meetingRooms.helpers({
   room: function () {
      return Session.get('meetingRooms');
   },
   // returns a % progress number
   progressPercent: function(id){
      return Session.get('progress-percent' + id);
   },
   // returns a class name if the booking is in session or not
   isInSession: function (id) {
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
