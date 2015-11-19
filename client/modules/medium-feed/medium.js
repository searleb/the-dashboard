Template.mediumFeed.helpers({
    feed: function() {
        var serverFeed = MediumFeed.find().fetch()[0];
        var content = $.parseJSON(serverFeed.feed.content);
        var times = content.responseData.feed.entries;

        $(times).each(function(index, el) {
            var object = $(el);
            object.publishedDate = moment(object.publishedDate).format('ddd, DD MMM YYYY');
            content.responseData.feed.entries[index].publishedDate = object.publishedDate;
        });

        return content.responseData.feed.entries;
    }
});
