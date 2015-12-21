Meteor.startup(function (argument) {
    Router.configure({
      layoutTemplate: 'siteLayout'
    });
    // Home page - main dashboard
    Router.route('/', function () {
        this.render('home');
    });
    //
    Router.route('/meeting-rooms');
});
