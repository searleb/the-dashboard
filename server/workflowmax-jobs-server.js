Meteor.startup(function() {
    var workflowmaxURL = WORKFLOWMAXURL,
    apiKey = WFMAPIKEY,
    accountKey = SYD_ACCOUNT_KEY;

    Meteor.methods({
        getJobList: function() {
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
            var jobDetailRequest = HTTP.get(workflowmaxURL + 'job.api/get/' + jobId + '?apiKey=' + apiKey + '&accountKey=' + accountKey);
            var jobDetails;
            xml2js.parseString(jobDetailRequest.content, {
                normalizeTags: true,
                explicitArray: false
            }, function(err, data) {
                if (err) {
                    jobDetails = err;
                } else {
                    // if there is only 1 task object xml2js does not add this obj to an array but we need an array for the template.
                    var tasks = data.response.job.tasks.task;
                    if (Array.isArray(tasks) === false) {
                        taskArray = [];
                        for (var i = 0; i < 1; i++) {
                            taskArray.push(tasks);
                        }
                        data.response.job.tasks.task = taskArray;
                    }
                    jobDetails = data.response;
                }
            });
            // return to client
            return jobDetails.job;
        },

        getJobCosts: function(jobId){
            var jobCostsRequest = HTTP.get(workflowmaxURL + 'job.api/costs/' + jobId + '?apiKey=' + apiKey + '&accountKey=' + accountKey);
            var jobCosts;
            xml2js.parseString(jobCostsRequest.content, {
                normalizeTags: true,
                explicitArray: false
            }, function(err, data) {
                if (err) {
                    jobCosts = err;
                } else {
                    jobCosts = data.response;
                }
            });
            // return to client
            return jobCosts.costs;
        }

    });
});
