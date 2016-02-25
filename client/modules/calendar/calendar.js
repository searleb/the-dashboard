
Template.calendar.helpers({
   gCalendar: function(){
      return Session.get('googleCalendar');
   }
});

Template.calendar.onCreated( function () {
   this.autorun(function () {
      if (Meteor.user()) {
         getCalendar();
      }
   });

   function notifyMe(title, message) {
      console.log('notfiyMe');
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
         console.log("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
         // If it's okay let's create a notification
         spawnNotification(title, message);
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
         Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
               var notification = new Notification("Hi there!");
            }
         });
      }

      // At last, if the user has denied notifications, and you
      // want to be respectful there is no need to bother them any more.
   }

   function spawnNotification(theTitle, theBody) {
      var options = {
         body: theBody,
         icon: 'http://hsh.mf.net.au/mf-logo.png'
      };
      var n = new Notification(theTitle,options);
   }

   var notificationsTracker = {};

   function getCalendar(argument) {
      var userData = Meteor.user();
      var timeMin = new moment().set('hour', 0).set('minute', 0).set('second', 0),
      timeMax = new moment().add(1,'days').set('hour', 0).set('minute', 0).set('second', 0),
      url = 'calendar/v3/calendars/' + userData.services.google.email + '/events/?timeMin=' + timeMin.toISOString() + '&timeMax=' + timeMax.toISOString() + '&maxResults=10' + '&orderBy=startTime' + '&singleEvents=true' + '&access_token=' + userData.services.google.accessToken;
      GoogleApi.get(url, {}, function(error, data){
         for (var i in data.items) {
            var item = data.items[i];

            // format the start and end times
            item.start.formattedTime = moment(item.start.dateTime).format('hh:mma');
            item.end.formattedTime = moment(item.end.dateTime).format('hh:mma');
            // determine what time the event was
            var now = new moment().format('HHmm');
            var startTime = moment(item.start.dateTime).format('HHmm');
            var endTime = moment(item.end.dateTime).format('HHmm');
            var summary = item.summary;

            // if the event start time is in 10 mins, set the current class
            // and send the web notification
            if(now >= (startTime - 10) && now < endTime) {

               // set the class
               item.timeClass = 'current';

               // send the notification if the event is in the future
               // and has not already been shown
               if (notificationsTracker.id !== true && startTime - now > 0) {
                  notifyMe(summary, "Starting in: " + (startTime - now) + " minutes"  );
                  var id = item.id;
                  notificationsTracker.id = true;
               }
            } else if (now > endTime){
               item.timeClass = 'past';
            } else {
               item.timeClass = 'future';
            }
         }
         Session.set('googleCalendar', data);
      });
   }
   (function(){
      Meteor.setInterval(function(){
         if (tabIsFocused) {
            getCalendar();
         }
      }, 1000 * 60);
   })();
});
