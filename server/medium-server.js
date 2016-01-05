Meteor.methods({
    getMediumFeed: function(){
        data = Scrape.feed("http://medium.com/feed/@MentallyFriendly");
        return data;
    }
});
