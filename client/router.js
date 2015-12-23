Meteor.startup(function (argument) {
    // Global site layout
    Router.configure({
      layoutTemplate: 'siteLayout'
    });
    // Home page - main dashboard
    Router.route('/', function () {
        this.render('home');
    });
    // Meeting rooms
    Router.route('/meeting-rooms');
    // Workmax Max Jobs
    Router.route('/workflowmax-jobs');
    // Workflow Max Job
    Router.route('/workflowmax-jobs/:_id', function(){
        var params = this.params;
        this.render('jobDetails', {
            data: function (argument) {
                return {
                    params: params._id
                };
            }
        });
    });
});
