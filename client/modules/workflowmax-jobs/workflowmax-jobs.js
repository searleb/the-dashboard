// Jobs Listing
Template.workflowmaxJobs.onCreated(function(){
    Meteor.call('getJobList', function (err, data) {
        if (err) {
            Session.set('jobList', err);
        } else {
            Session.set('jobList', data);
        }
        console.log(Session.get('jobList'));
    });
});

Template.workflowmaxJobs.onRendered(function(){
   Tracker.autorun(function () {
      var fields = Session.get('customFields');
      $("#current-jobs-table").tablesorter({
         // Sort on the first column (client name), in ascending order
         // then third column (job number), in ascending order
         sortList: [[0,0], [2,0]]
      });
   });
});

Template.workflowmaxJobs.helpers({
    jobList: function() {
        var jobList = Session.get('jobList');
        return jobList;
    },
    customFields: function() {
        Meteor.call('getCustomFields', function (err, data) {
            if (err) {
                Session.set('customFields', err);
            } else {
                Session.set('customFields', data);
            }
        });
        console.log(Session.get('customFields'));
        return Session.get('customFields');
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
Template.jobDetails.helpers({
    jobDetails: function(){
        var id = Router.current().params._id;
        var details = Meteor.call('getJobDetails', id, function(err, data){
            if (err) {
                Session.set('jobDetails-' + id, err);
            } else {
                Session.set('jobDetails-' + id, data);
            }
        });
        var jobDetails = Session.get('jobDetails-' + id);
        return jobDetails;
    },

    jobCosts: function(){
        var id = Router.current().params._id;
        var costs = Meteor.call('getJobCosts', id, function (err, data) {
            if (err) {
                Session.set('jobCosts-' + id, err);
            } else {
                if (data.costs.length === 0) {
                    var array = [];
                    var newObj = {costs: {cost:[{description: 'None'}]}};
                    array.push(newObj);
                    Session.set('jobCosts-' + id, newObj );
                } else {
                    Session.set('jobCosts-' + id, data);
                }
            }
        });
        jobCosts = Session.get('jobCosts-' + id);
        if (jobCosts !== undefined) {
            return jobCosts.costs;
        }
    }
});
