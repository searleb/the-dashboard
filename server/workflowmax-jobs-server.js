Meteor.startup(function() {

    function checkIsArray(argument) {
        // if the arg is not at array, return it within an array
        if (Array.isArray(argument) === false) {
            var array = [];
            array.push(argument);
            return array;
        } else {
            // else just return the args with no modification
            return argument;
        }
    }

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
                    data.response.job.tasks.task = checkIsArray(data.response.job.tasks.task);
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
                    data.response.costs.cost = checkIsArray(data.response.costs.cost);
                    jobCosts = data.response;
                }
            });
            // return to client
            return jobCosts;
        },

        getCustomFields: function(){
            var customFieldsRequest = HTTP.get(workflowmaxURL + 'customfield.api/definition/?apiKey=' + apiKey + '&accountKey=' + accountKey);
            var customFields;
            xml2js.parseString(customFieldsRequest.content, {
                normalizeTags: true,
                explicitArray: false
            }, function(err, data) {
                console.log('getCustomFields', data);
                if (err) {
                    customFields = err;
                } else {
                    data.response.customfielddefinitions.customfielddefinition = checkIsArray(data.response.customfielddefinitions.customfielddefinition);
                    customFields = data.response.customfielddefinitions.customfielddefinition;

                    _.each(customFields, function (el) {
                        var id = el.id;
                        var getcustom = HTTP.get(workflowmaxURL + 'job.api/cost/' + id + '?apiKey=' + apiKey + '&accountKey=' + accountKey);
                        console.log(getcustom);
                        // console.log(id);
                    });
                }
            });
            // return to client
            return customFields;
        }

    });
});
