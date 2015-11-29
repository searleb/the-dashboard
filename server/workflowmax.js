Meteor.startup(function() {
    var workflowmaxURL = WORKFLOWMAXURL,
        apiKey = WFMAPIKEY,
        accountKey = WFMACCOUNTKEY;

    Meteor.methods({
        getUserTimes: function() {
            var userID;
            // Get current user data
            var userData = Meteor.user();

            // Get staff list
            var stafflist = HTTP.get(workflowmaxURL + 'staff.api/list?apiKey=' + apiKey + '&accountKey=' + accountKey);

            // Convert XML to JS with xml2js
            stafflist = xml2js.parseString(stafflist.content, {
                normalizeTags: true,
                explicitArray: false
            }, function(err, data) {
                var staffList = data.response.stafflist.staff;

                // Find the current users WorkflowMax ID by matching with google email
                for (var i = 0; i < staffList.length; i++) {
                    if (staffList[i].email == userData.services.google.email) {
                        userID = staffList[i].id;
                    }
                }
            });

            // set dates for range of times requested
            var now = moment().format('YYYYMMDD');
            var start = moment().subtract(7, 'days').format('YYYYMMDD');

            // call WorkflowMax API
            var request = HTTP.get(workflowmaxURL + 'time.api/staff/' + userID + '?apiKey=' + apiKey + '&accountKey=' + accountKey + '&from=' + start + '&to=' + now);

            // this will be returned to the client as hours and day
            var returnArray = [];

            // convert xml to js
            xml2js.parseString(request.content, {
                normalizeTags: true,
                explicitArray: false
            }, function(err, data) {

                // group the returned objects by date
                var groupedByDate = _.groupBy(data.response.times.time, 'date');

                // loop each group
                _.each(groupedByDate, function(el, index) {
                    // track minutes logged here
                    var runningTotal = 0;

                    // each entry under the grouped date
                    _.each(el, function(el, index) {
                        var hours = Math.round(el.minutes / 60);
                        runningTotal += parseInt(hours);
                    });

                    // format the date into day
                    var formattedDate = moment(index).format('ddd').toString();

                    // push the hours and day in to returnArray
                    returnArray.push({
                        hours: runningTotal,
                        day: formattedDate
                    });
                });
            });

            // return returnArray to the client
            return returnArray;
        }
    });
});
