Tracker.autorun(function () {
    Meteor.call('getMediumFeed', function (err, data) {
        Session.set('mediumFeed', data);
    });
});


Template.mediumFeed.helpers({
    feed: function() {
        var serverFeed = MediumFeed.find().fetch()[0];
        var content = $.parseJSON(serverFeed.feed.content);
        var times = content.responseData.feed.entries;

        $(times).each(function(index, el) {
            var timeString = JSON.stringify(el.publishedDate);
            var formattedTime = moment(timeString).format('DD MMM YYYY');
            content.responseData.feed.entries[index].publishedDate = formattedTime;
        });

        return content.responseData.feed.entries;
    },
    sessionFeed: function(){
        return Session.get('mediumFeed');
    }

});
