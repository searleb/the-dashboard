Template.robinFeed.onCreated(function(){
    var robinFeed = Meteor.call('getRobinRooms', function (err, data) {
        console.log(err, data);
    });
    console.log(robinFeed);
});
