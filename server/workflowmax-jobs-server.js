Meteor.startup(function() {
    var workflowmaxURL = WORKFLOWMAXURL,
    apiKey = WFMAPIKEY,
    accountKey = SYD_ACCOUNT_KEY;

    Meteor.methods({
        getJobList: function() {
            console.log("getJobList");

            // Get job list
            var jobRequest = HTTP.get(workflowmaxURL + 'job.api/current?apiKey=' + apiKey + '&accountKey=' + accountKey);
            // Convert XML to JS with xml2js
            var jobList;
            xml2js.parseString(jobRequest.content, {
                normalizeTags: true,
                explicitArray: false
            }, function(err, data) {
                if (err) {
                    jobList = err;
                } else {
                    jobList = data.response.jobs.job;
                }
            });
            // return to the client
            return jobList;
        },
        getJobDetails: function(jobId){
            console.log("getJobDetails ", jobId);
            console.log(workflowmaxURL + 'job.api/costs/' + jobId + '?apiKey=' + apiKey + '&accountKey=' + accountKey);
            var jobDetailRequest = HTTP.get(workflowmaxURL + 'job.api/costs/' + jobId + '?apiKey=' + apiKey + '&accountKey=' + accountKey);
            var jobDetails;
            xml2js.parseString(jobDetailRequest.content, {
                normalizeTags: true,
                explicitArray: false
            }, function(err, data) {
                if (err) {
                    jobDetails = err;
                } else {
                    jobDetails = data.response;
                }
            });
            // return to client
            console.log(jobDetails);
            return jobDetails;
        }
    });
});
