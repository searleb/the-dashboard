Meteor.startup(function() {
   const workflowmaxURL = 'https://api.workflowmax.com/',
   apiKey = Meteor.settings.private.workflowMaxApiKey;
   let accountKey;

   Meteor.methods({
      getHours: function() {
         let userID;
         // Get current user data
         const userData = Meteor.user();
         const userOffice = userData.profile.office;
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
         const today = moment().format('YYYYMMDD');
         const lastMonth = moment().subtract(1, 'month').format('YYYYMMDD');

         var datesArray = [];
         var now = moment();
         var pastDate = moment().subtract(1, 'month');
         while (pastDate < now) {
            var obj = {};
            obj.date = pastDate.format('YYYYMMDD');
            obj.hours = 0;
            obj.class = 'danger';
            datesArray.push(obj);
            pastDate = moment(pastDate).add(1, 'day');
         }

         // Get hours list
         let hoursLogged = HTTP.get(workflowmaxURL + 'time.api/list?apiKey=' + apiKey + '&accountKey=' + accountKey + '&from=' + lastMonth + '&to=' + today);

         // Convert XML to JS with xml2js
         hoursLogged = xml2js.parseString(hoursLogged.content, {
            normalizeTags: true,
            explicitArray: false,
            valueProcessors: [xml2js.processors.parseNumbers]
         }, function(err, data) {
            const json = data.response.times.time;

            // Sort the response by date
            const sorted = _.sortBy(json, function(i){
               return i.date;
            });

            // Group the sorted array into arrays by staff id
            const grouped = _.groupBy(sorted, function(i){
               return i.staff.id;
            });


            // Each group is the user with all time entries
            _.each(grouped, function(user, id){

               // New object for each user
               let userObj = {
                  name: '',
                  id: '',
                  hours: []
               };

               // Set the user object id and name
               userObj.id = id;
               userObj.name = user[0].staff.name;

               // // Variables for tracking the last entries date and minutes
               let lastEntryDate = "";
               let lastEntryMinutes = 0;

               // Each array of hours in the group
               _.each(user, function(entry, i) {

                  // entry example
                  //{ id: 80664243,
                  //    job: { id: 'BDA1605', name: 'amplify.me - Production' },
                  //    task: { id: 45120384, name: 'Product Manager' },
                  //    staff: { id: 353467, name: 'Jo Pforr' },
                  //    date: '2016-05-20T00:00:00',
                  //    minutes: 480,
                  //    note: 'Roadmap',
                  //    billable: 'true'
                  // }

                  let entryDate = entry.date;
                  let entryMinutes = entry.minutes;

                  // If the last entry date is NOT equal to the current entry,
                  // then add current entry to the hours array
                  if(lastEntryDate != entryDate){
                     let hoursObj = {};
                     hoursObj.date = moment(entryDate).format('YYYYMMDD');
                     hoursObj.hours = round( entryMinutes / 60, 2);

                     if (hoursObj.hours > 7) {
                        hoursObj.class = 'success';
                     }
                     if (hoursObj.hours < 8 && hoursObj.hours > 3) {
                        hoursObj.class = 'warning';
                     }
                     if (hoursObj.hours <= 3) {
                        hoursObj.class = 'danger';
                     }

                     lastEntryMinutes = entry.minutes;

                     userObj.hours.push(hoursObj);
                  }

                  // If the last entry date IS equal to the current entry,
                  // remove the last entry from the user hours array,
                  // add the last and current together,
                  // then push back to the user hours array
                  if (lastEntryDate == entryDate) {
                     let runningTotal = _.last(userObj.hours);

                     userObj.hours.splice(-1,1);
                     let hoursObj = {};
                     // let pastHours = lastEntryMinutes / 60;
                     hoursObj.date = moment(entryDate).format('YYYYMMDD');
                     hoursObj.hours = round( (lastEntryMinutes + entryMinutes) / 60, 2);

                     if (hoursObj.hours >= 8) {
                        hoursObj.class = 'success';
                     }
                     if (hoursObj.hours < 8 && hoursObj.hours > 3) {
                        hoursObj.class = 'warning';
                     }
                     if (hoursObj.hours <= 3) {
                        hoursObj.class = 'danger';
                     }

                     lastEntryMinutes += entry.minutes;

                     userObj.hours.push(hoursObj);
                  }

                  // Set the last entry variables to the current entry for the next loop
                  lastEntryDate = entry.date;

               });

               mergeByProperty(userObj.hours, datesArray, 'date');
               returnArray.push(userObj);
            });

         });
         returnArray = _.sortBy(returnArray, 'name');
         return returnArray;
      },
      getTrackedDates: function(){
         var datesArray = [];
         var now = moment();
         var pastDate = moment().subtract(1, 'month');
         while (pastDate < now) {
            datesArray.push( pastDate.format('D/M') );
            pastDate = moment(pastDate).add(1, 'day');
         }
         return datesArray;
      }
   });

   /***************************************************/
   /** Merge 2 arrays of objects using underscore.js **/
   /***************************************************/

   //arr2 will be merged into arr1, arr1 will be extended as needed.

   function mergeByProperty(arr1, arr2, prop) {
      _.each(arr2, function(arr2obj, i) {

         var arr1obj = _.find(arr1, function(arr1obj) {
            return arr1obj[prop] === arr2obj[prop];
         });

         //If the object already exist extend it with the new values from arr2, otherwise just add the new object to arr1
         if (arr1obj === undefined) {
            arr1.splice(i, 0, arr2obj );
         }
      });
   }

   function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
   }
});
