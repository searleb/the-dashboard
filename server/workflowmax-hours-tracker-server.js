Meteor.startup(function() {
   var workflowmaxURL = 'https://api.workflowmax.com/',
   apiKey = Meteor.settings.private.workflowMaxApiKey,
   accountKey;

   Meteor.methods({
      getHours: function() {
         var userID;
         // Get current user data
         var userData = Meteor.user();
         var userOffice = userData.profile.office;
         switch (userOffice) {
            case 'sydney':
            accountKey = Meteor.settings.private.workflowMaxSydKey;
            break;
            case 'london':
            accountKey = Meteor.settings.private.workflowMaxLdnKey;
            break;
            default:
            console.log("Please select an office from settings");
            return false;
         }

         var returnArray = [];

         // set dates for range of times requested
         var today = moment().format('YYYYMMDD');
         var lastMonth = moment().subtract(1, 'month').format('YYYYMMDD');

         // Get hours list
         var hoursLogged = HTTP.get(workflowmaxURL + 'time.api/list?apiKey=' + apiKey + '&accountKey=' + accountKey + '&from=' + lastMonth + '&to=' + today);

         // Convert XML to JS with xml2js
         hoursLogged = xml2js.parseString(hoursLogged.content, {
            normalizeTags: true,
            explicitArray: false,
            valueProcessors: [xml2js.processors.parseNumbers]
         }, function(err, data) {
            var json = data.response.times.time;

            // Sort the response by date
            var sorted = _.sortBy(json, function(i){
               return i.date;
            });
            // Group the sorted array into arrays by staff id
            var grouped = _.groupBy(sorted, function(i){
               return i.staff.id;
            });


            // List of userIDs
            var userIDs = {};
            _.each(grouped, function(el, id){

               // Set the object key to the users ID
               userIDs[id] = [];

               // Add the users minutes into an array against their ID
               var lastEntryDate = 0;
               var lastEntryMinutes = 0;

               _.each(el, function(el, i) {
                  var currentDate = moment(el.date).format('YYYYMMDD');
                  var currentMinutes = el.minutes;
                  // If the previous entry date is == to current el then add the minutes together
                  if (lastEntryDate == currentDate) {
                     el.minutes += lastEntryMinutes;
                  } else {
                     userIDs[id].push(el.minutes / 60 + " date " + moment(el.date).format('YYYY-MM-DD'));
                  }
                  lastEntryDate = currentDate;
                  lastEntryMinutes = currentMinutes;
               });
            });


            returnArray.push(userIDs);
         });



         // // call WorkflowMax API
         // var request = HTTP.get(workflowmaxURL + 'time.api/staff/' + userID + '?apiKey=' + apiKey + '&accountKey=' + accountKey + '&from=' + start + '&to=' + now);
         //
         // // this will be returned to the client as hours and day
         // var returnArray = [];
         //
         // // convert xml to js
         // xml2js.parseString(request.content, {
         //     normalizeTags: true,
         //     explicitArray: false
         // }, function(err, data) {
         //
         //     // group the returned objects by date
         //     var groupedByDate = _.groupBy(data.response.times.time, 'date');
         //
         //     // loop each group
         //     _.each(groupedByDate, function(el, index) {
         //         // track minutes logged here
         //         var runningTotal = 0;
         //
         //         // each entry under the grouped date
         //         _.each(el, function(el, index) {
         //             runningTotal += parseInt(el.minutes);
         //         });
         //
         //         // format the date into day
         //         var formattedDate = moment(index).format('ddd Do').toString();
         //
         //         // push the hours and day in to returnArray
         //         returnArray.push({
         //             hours: runningTotal / 60,
         //             day: formattedDate
         //         });
         //     });
         // });

         // return returnArray to the client
         return returnArray;
      }
   });
});
