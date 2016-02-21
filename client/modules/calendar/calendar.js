
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

   // function notifyMe() {
   //    console.log('notfiyMe');
   //    // Let's check if the browser supports notifications
   //    if (!("Notification" in window)) {
   //       alert("This browser does not support desktop notification");
   //    }
   //
   //    // Let's check whether notification permissions have already been granted
   //    else if (Notification.permission === "granted") {
   //       // If it's okay let's create a notification
   //       spawnNotification("Hello", "Some Thing");
   //    }
   //
   //    // Otherwise, we need to ask the user for permission
   //    else if (Notification.permission !== 'denied') {
   //       Notification.requestPermission(function (permission) {
   //          // If the user accepts, let's create a notification
   //          if (permission === "granted") {
   //             var notification = new Notification("Hi there!");
   //          }
   //       });
   //    }
   //
   //    // At last, if the user has denied notifications, and you
   //    // want to be respectful there is no need to bother them any more.
   // }

   // function spawnNotification(theBody, theTitle) {
   //    var options = {
   //       body: theBody,
   //    };
   //    var n = new Notification(theTitle,options);
   // }

   function getCalendar(argument) {
      var userData = Meteor.user();
      var timeMin = new moment().set('hour', 0).set('minute', 0).set('second', 0),
      timeMax = new moment().add(1,'days').set('hour', 0).set('minute', 0).set('second', 0),
      url = 'calendar/v3/calendars/' + userData.services.google.email + '/events/?timeMin=' + timeMin.toISOString() + '&timeMax=' + timeMax.toISOString() + '&maxResults=10' + '&orderBy=startTime' + '&singleEvents=true' + '&access_token=' + userData.services.google.accessToken;
      GoogleApi.get(url, {}, function(error, data){
         for (var i in data.items) {
            // format the start and end times
            data.items[i].start.formattedTime = moment(data.items[i].start.dateTime).format('hh:mma');
            data.items[i].end.formattedTime = moment(data.items[i].end.dateTime).format('hh:mma');

            // determine what time the event was
            var now = new moment().format('HHmm');
            var startTime = moment(data.items[i].start.dateTime).format('HHmm');
            var endTime = moment(data.items[i].end.dateTime).format('HHmm');
            if(now >= startTime - 10 && now < endTime) {
               data.items[i].timeClass = 'current';
               // notifyMe();
            } else if (now > endTime){
               data.items[i].timeClass = 'past';
            } else {
               data.items[i].timeClass = 'future';
            }
         }
         Session.set('googleCalendar', data);
      });
   }
   (function(){
      Meteor.setInterval(getCalendar, 300000); // 5 minute update cycle
   })();
});
