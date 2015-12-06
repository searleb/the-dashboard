Tracker.autorun(function () {
    Meteor.call('getMediumFeed', function (err, data) {
        Session.set('mediumFeed', data);
    });
});


Template.mediumFeed.helpers({
    sessionFeed: function(){
        var feed = Session.get('mediumFeed');
        $(feed.items).each(function(index, el) {
            el.pubDate = moment(el.pubDate).format('DD MMM YYYY');
            el.description = el.description.replace("Continue reading on Medium »", "");
        });
        return feed;
    }
});

Template.mediumFeed.onRendered(function (argument) {
    console.log("HELLO");
    $('.slider').slick({
        autoplay: true,
        dots: true,
        fade: true,
        rows: 2,
        autoplaySpeed: 5000,
        arrows: false
    });
});
