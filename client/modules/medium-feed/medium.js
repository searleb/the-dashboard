Tracker.autorun(function () {
    Meteor.call('getMediumFeed', function (err, data) {
        Session.set('mediumFeed', data);
    });
});

Template.mediumFeed.helpers({
    sessionFeed: function(){
        var feed = Session.get('mediumFeed');
        if (feed) {
            $(feed.items).each(function(index, el) {
                el.pubDate = moment(el.pubDate).format('DD MMM YYYY');
                el.description = el.description.replace("Continue reading on Medium »", "");
            });
        }

        Packery.layout();
        
        return feed;
    }
});
