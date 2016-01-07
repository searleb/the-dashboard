Meteor.methods({
    getRobinRooms: function(){
        console.log('getRobinRooms');
        var robinToken = ROBIN_APP_TOKEN;
        var robinURL = 'https://api.robinpowered.com/v1.0/';

        // Get all of a location's spaces
        var rooms = HTTP.get(robinURL + 'locations/1548/spaces', {
            headers: {
                Authorization: 'Access-Token ' + robinToken
            }
        });

        // array to return to client
        var returnArray = [];

        // each space has multiple objects returned so we have to loop through .data.data
        _.each(rooms.data.data, function(el, index){
            var obj = {};
            obj.space = el;
            obj.bookings = getSpaceEvents(el.id);

            returnArray.push(obj);
        });

        function getSpaceEvents(id) {
            // get events between today and tomorrow
            var tomorrow = moment().add(1, 'day').toISOString();
            var today = moment().toISOString();
            var spaceDetails = HTTP.get(robinURL + 'spaces/' + id + '/events?before=' + tomorrow + '&after=' + today, {
                headers: {
                    Authorization: 'Access-Token ' + robinToken
                }
            });
            // sort the data by start date
            var data = spaceDetails.data.data;
            var sorted = _.sortBy(data, 'started_at');
            return sorted;
        }


        return returnArray;

        // HTTP.get(robinURL + 'free-busy/spaces', {
        //     headers: {
        //         Authorization: 'Access-Token ' + robinToken
        //     }
        // }, function (err, data) {
        //     console.log("FREE? ",data);
        // });
    }


});
// 1548
