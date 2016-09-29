Meteor.methods({
   getRobinRooms: function(){
      var robinToken = Meteor.settings.private.robinAppToken;
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
         _.each(data, function(el, index){
            data[index].started_at = moment(el.started_at).format();
            data[index].ended_at = moment(el.ended_at).format();
         });
         var sorted = _.sortBy(data, 'started_at');
         return sorted;
      }
      return returnArray;

   },
   whatsFree: function (id) {
      console.log('whatsFree', id);
      var robinToken = ROBIN_APP_TOKEN;
      var robinURL = 'https://api.robinpowered.com/v1.0/';

      var response = HTTP.get(robinURL + 'free-busy/spaces?space_ids=' + id, {
         headers: {
            Authorization: 'Access-Token ' + robinToken
         }
      });
      var data = response.data.data;
      return data;
   }
});
