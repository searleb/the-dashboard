// Global site layout
Router.configure({
    layoutTemplate: 'siteLayout',
    loadingTemplate: 'loading'
});

// Home page - main dashboard
Router.route('/', function () {
    this.render('home');
});

// Meeting rooms
Router.route('/meeting-rooms',{
    onAfterAction: function() {
        $('.iconav .meeting-rooms').addClass('active');
    },
    onStop: function() {
        $('.iconav .meeting-rooms').removeClass('active');
    }
});

// Workflow Max Jobs
Router.route('/workflowmax-jobs', {
    onAfterAction: function() {
        $('.iconav .wfm').addClass('active');
    },
    onStop: function() {
        $('.iconav .wfm').removeClass('active');
    }
});

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
}, {
    onAfterAction: function() {
        $('.iconav .wfm').addClass('active');
    },
    onStop: function() {
        $('.iconav .wfm').removeClass('active');
    }
});

// Friendly banter podcast
Router.route('/friendly-banter');

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

// hides tooltips after a new route is run
Router.onAfterAction(function(){
    $('.iconav [data-toggle="tooltip"]').tooltip('hide');
});
