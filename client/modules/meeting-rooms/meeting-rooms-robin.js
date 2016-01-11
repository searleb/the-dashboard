Template.meetingRooms.onCreated(function(){
    function getRooms() {
        console.log('getRooms');
        var robinFeed = Meteor.call('getRobinRooms', function (err, data) {
            Session.set('meetingRooms', data);
        });
    }

    // call getRooms and update every 5 minutes
    Meteor.setInterval(function(){
        getRooms();
    }, (1000 * 60) * 5);
    
    getRooms();

});

Template.meetingRooms.helpers({
    room: function () {
        return Session.get('meetingRooms');
    },
    // returns a percentage progress of the current booking
    progress: function(start, end, id){
        Meteor.setInterval(function(){
            var now = moment();
            var starting = moment(start);
            var ending = moment(end);

            if (starting <= now && ending >= now) {
                var duration = ending - starting;
                var progress = now - starting;
                var percentage = progress / duration * 100;

                Session.set('progress-percent' + id, percentage);
            }
        }, 1000);

        return Session.get('progress-percent' + id);
    },
    // returns a class name if the booking is in session or not
    isInSession: function (start, end) {
        var now = moment();
        var starting = moment(start);
        var ending = moment(end);

        if (starting <= now && ending >= now) {
            return 'in-session';
        } else {
            return 'not-in-session';
        }
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
