Meteor.startup(function () {
    // // code to run on server at startup
    HTTP.get('https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://medium.com/feed/@MentallyFriendly&num=3', {}, function (err, data) {
        if (err) {
            throw new Meteor.error( 500, err );
        } else {
            if ( MediumFeed.find().count() === 0) {
                console.log("SERVER RECORD: " + MediumFeed.find().count() );
                MediumFeed.insert({
                    feed: data
                });
            } else {
                var record = MediumFeed.find().fetch()[0]._id;
                MediumFeed.update(record, {feed: data});
            }
        }
    });
});
