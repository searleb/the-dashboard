Meteor.startup(function () {
    // // code to run on server at startup
    HTTP.get('https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://medium.com/feed/@MentallyFriendly&num=3', {}, function (err, data) {
        if (err) {
            throw new Meteor.error( 500, err );
        } else {
            MediumFeed.insert({
                feed: data
            });
        }
    });
});
