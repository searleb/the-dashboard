Tracker.autorun(function(){
    if (Meteor.user() !== null) {
        Meteor.call('getUserTimes', function (err, data) {
            Session.set('loggedHours', data);
        });
    } else{
        console.log('Not logged in buddy');
    }
});

Template.workflowmax.helpers({
    loggedHours: function() {
        var hours =  Session.get('loggedHours');
        $(hours).each(function(index, el) {
            if (el.hours < 7) {
                el.class = "not-complete";
            } else if ( el.hours == 8){
                el.class = "complete";
            }
        });
        return hours;
    }
});
