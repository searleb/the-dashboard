Meteor.startup(function () {
    // // code to run on server at startup
    Meteor.methods({
        getMediumFeed: function(){
            data = Scrape.feed("http://medium.com/feed/@MentallyFriendly");
            return data;
        }
    });

});
