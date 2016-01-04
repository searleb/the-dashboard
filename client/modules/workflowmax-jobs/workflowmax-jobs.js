// Jobs Listing
Template.workflowmaxJobs.onCreated(function(){
    Meteor.call('getJobList', function (err, data) {
        if (err) {
            Session.set('jobList', err);
        } else {
            Session.set('jobList', data);
        }
    });
});

Template.workflowmaxJobs.helpers({
    jobList: function() {
        var jobList = Session.get('jobList');
        return jobList;
    }
});

Template.workflowmaxJobs.events({
    'click a': function(e){
        // e.preventDefault();
        var jobId = $(e.target).attr('data-id');
        var details = Meteor.call('getJobDetails', jobId);
        Session.set('jobDetails-' + jobId, details);
    }
});


// Job details
Template.jobDetails.onCreated(function(){
    var id = Router.current().params._id;
    var details = Meteor.call('getJobDetails', id, function(err, data){
        if (err) {
            Session.set('jobDetails-' + id, err);
        } else {
            Session.set('jobDetails-' + id, data);
        }
    });
});

Template.jobDetails.helpers({
    jobDetails: function(){
        var id = Router.current().params._id;
        var jobDetails = Session.get('jobDetails-' + id);
        return jobDetails;
    },
    jobCosts: function(){
        var id = Router.current().params._id;
        var costs = Meteor.call('getJobCosts', id, function (err, data) {
            if (err) {
                Session.set('jobCosts-' + id, err);
            } else {
                Session.set('jobCosts-' + id, data);
            }
        });
        var jobCosts = Session.get('jobCosts-' + id);
        console.log('jobCosts', jobCosts);
        return jobCosts;
    }
});
