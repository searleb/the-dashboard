Meteor.startup(function (argument) {
    Router.configure({
      layoutTemplate: 'siteLayout'
    });
    // Home page - main dashboard
    Router.route('/', function () {
        this.render('home');
    });
    // Meeting rooms
    Router.route('/meeting-rooms');
});
