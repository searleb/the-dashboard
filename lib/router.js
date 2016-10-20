// Global site layout
Router.configure({
   layoutTemplate: 'siteLayout',
   loadingTemplate: 'loading',
   notFoundTemplate: '404'
});

// Home page - main dashboard
Router.route('/', {
   template: 'home',
   onAfterAction: function(){
      Packery.init();
   }
});

// Login
Router.route('/login', function () {
   this.render('login');
});

// Social
Router.route('/social', {
   onAfterAction: function() {
      $('.nav-link.social').addClass('active');
   },
   onStop: function() {
      $('.nav-link.social').removeClass('active');
   }
});

// Hours Tracker
Router.route('/hours-tracker', {
   onAfterAction: function() {
      $('.nav-link.hours-tracker').addClass('active');
   },
   onStop: function() {
      $('.nav-link.hours-tracker').removeClass('active');
   }
});

// Meeting rooms
Router.route('/meeting-rooms',{
   onAfterAction: function() {
      $('.nav-link.meeting-rooms').addClass('active');
   },
   onStop: function() {
      $('.nav-link.meeting-rooms').removeClass('active');
   }
});

// Workflow Max Jobs
Router.route('/workflowmax-jobs', {
   onAfterAction: function() {
      $('.nav-link.wfm').addClass('active');
   },
   onStop: function() {
      $('.nav-link.wfm').removeClass('active');
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
      $('.nav-link.wfm').addClass('active');
   },
   onStop: function() {
      $('.nav-link.wfm').removeClass('active');
   }
});

// Friendly banter podcast
Router.route('/friendly-banter', {
   onAfterAction: function() {
      $('.nav-link.banter').addClass('active');
      $('body, html').addClass('friendly-banter');
   },
   onStop: function() {
      $('.nav-link.banter').removeClass('active');
      $('body, html').removeClass('friendly-banter');
   },
   // this template will be rendered until the subscriptions are ready
   loadingTemplate: 'loading',

   waitOn: function(){
      // return one handle, a function, or an array
      return Meteor.subscribe('audio');
   },
   action: function(){
      // render this when the subscriptions are ready
      this.render('friendlyBanter');
   }
});


Router.route('/okrs', {
   template: 'okrs',
   loadingTemplate: 'loading',
});
Router.route('/okrs/company', {
   template: 'okrsCompany',
   loadingTemplate: 'loading',
});
Router.route('/okrs/teams/', {
   template: 'okrsTeams',
   loadingTemplate: 'loading',
});


Router.route('/okrs/staff', {
   template: 'okrsStaffList',
   loadingTemplate: 'loading',
   waitOn() {
      return Meteor.subscribe('userList');
   }
});
Router.route('/okrs/staff/:id', {
   template: 'okrsStaffId',
   loadingTemplate: 'loading',
   waitOn() {
      return [ Meteor.subscribe('okrs', this.params.id), Meteor.subscribe('okrDates') ]
   },
});


Router.onBeforeAction(function () {
   // all properties available in the route function
   // are also available here such as this.params

   if (!Meteor.userId()) {
      // if the user is not logged in, render the Login template
      this.render('login');
   } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
   }
});
