
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
