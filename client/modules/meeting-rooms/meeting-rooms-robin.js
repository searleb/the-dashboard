Template.meetingRooms.onCreated(function(){
    var robinFeed = Meteor.call('getRobinRooms', function (err, data) {
        Session.set('meetingRooms', data);
    });
});

Template.meetingRooms.helpers({
    room: function () {
        var test = Session.get('meetingRooms');
        console.log(test);
        return Session.get('meetingRooms');
    }
});
