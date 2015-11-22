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
        return Session.get('loggedHours');
    }
});
