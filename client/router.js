Meteor.startup(function (argument) {

    // Global site layout
    Router.configure({
        layoutTemplate: 'siteLayout',
        loadingTemplate: 'loading'
    });

    // Home page - main dashboard
    Router.route('/', function () {
        if (Meteor.user()) {
            this.render('home');
        } else {
            this.render('login');
        }
    });

    // Meeting rooms
    Router.route('/meeting-rooms');

    // Workflow Max Jobs
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

Router.onBeforeAction(function () {
    // all properties available in the route function
    // are also available here such as this.params

    if (!Meteor.userId()) {
        // if the user is not logged in, render the Login template
        this.render('Login');
    } else {
        // otherwise don't hold up the rest of hooks or our route/action function
        // from running
        this.next();
    }
});
