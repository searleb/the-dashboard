// Login options
Accounts.ui.config({
    requestPermissions:{
        google:['https://www.googleapis.com/auth/calendar', 'email', 'openid']
    },
    requestOfflineToken: {
        google: true
    },
    forceApprovalPrompt: {
        google: true
    }
});

// helper to convert objects to arrays for use in blaze templates
UI.registerHelper("arrayify", function(obj){
    result = [];
    for (var key in obj){
        result.push({name:key,value:obj[key]});
    }
    return result;
});

Meteor.startup(function () {
    // Packery
    // Initialize all popups whenever any template is rendered
    // var $container = $('.container');
    // // init
    // $container.packery({
    //     itemSelector: '.module',
    //     gutter: 20,
    //     rowHeight: 100,
    //     percentPosition: true
    // });
});
