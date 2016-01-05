Tracker.autorun(function(){
    if ( Meteor.user() ) {
        Meteor.call('getUserTimes', function (err, data) {
            Session.set('loggedHours', data);
        });
    }
});

Template.workflowmaxTimeSheet.helpers({
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
