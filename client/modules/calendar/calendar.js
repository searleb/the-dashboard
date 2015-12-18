
Template.calendar.helpers({
    gCalendar: function(){
        return Session.get('google-calendar');
    }
});

var userData = null;
Template.calendar.onCreated( function () {
    this.autorun(function(){
        userData = Meteor.user();
        if (userData) {
            getCalendar();
        }
    });

    function getCalendar(argument) {
        var timeMin = new moment().set('hour', 0).set('minute', 0).set('second', 0),
            timeMax = new moment().add(1,'days').set('hour', 0).set('minute', 0).set('second', 0),
            url = 'calendar/v3/calendars/' + userData.services.google.email + '/events/?timeMin=' + timeMin.toISOString() + '&timeMax=' + timeMax.toISOString() + '&maxResults=10' + '&orderBy=startTime' + '&singleEvents=true' + '&access_token=' + userData.services.google.accessToken;
        GoogleApi.get(url, {}, function(error, data){
            for (var i in data.items) {
                var startTime = moment(data.items[i].start.dateTime).format('hh:mma'),
                    endTime = moment(data.items[i].end.dateTime).format('hh:mma');
                data.items[i].start.dateTime = startTime;
                data.items[i].end.dateTime = endTime;
            }
            Session.set('google-calendar', data);
        } );

    }
    (function(){
        Meteor.setInterval(getCalendar, 100000 * 5);
    })();
});
