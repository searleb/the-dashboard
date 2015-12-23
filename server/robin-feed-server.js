Meteor.startup(function(){
    Meteor.methods({
        getRobinRooms: function(){
            var robinURL = "https://api.robinpowered.com/v1.0/";
            console.log("ROBIN URL " + robinURL);
            var auth = HTTP.get(robinURL + "spaces/1", {
                auth: ROBIN_APP_TOKEN
            });
            console.log("AUTH ", auth);
            return auth;

        }
    });
});
