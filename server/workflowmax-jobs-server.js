Meteor.startup(function() {

   // constants
   var workflowmaxURL = WORKFLOWMAXURL,
   apiKey = WFMAPIKEY,
   accountKey = SYD_ACCOUNT_KEY;

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

   function parseToJson(xml) {
      var result;
      xml2js.parseString(xml.content, {
         normalizeTags: true,
         explicitArray: false
      }, function(err, data) {
         if (err) {
            result = err;
         } else {
            result = data.response;
         }
      });
      return result;
   }

   // returns invoices of a specific job
   function getJobInvoices (jobId) {
      var jobInvoiceRequest = HTTP.get(workflowmaxURL + 'invoice.api/job/' + jobId + '?apiKey=' + apiKey + '&accountKey=' + accountKey);
      var jobInvoices = parseToJson(jobInvoiceRequest);
      // check is Array
            // data.response.costs.cost = checkIsArray(data.response.costs.cost);
            // jobInvoices = data.response;
      // return to client
      return jobInvoices;
   }

   Meteor.methods({
      // returns a list of all current jobs
      getJobList: function() {
         var jobRequest = HTTP.get(workflowmaxURL + 'job.api/current?apiKey=' + apiKey + '&accountKey=' + accountKey);
         // Convert XML to JS with xml2js
         var jobList = parseToJson(jobRequest);

         _.each(jobList, function (job, i) {
            console.log("each job", job.id);
            // job.invoices = getJobInvoices(job.id);
            // console.log(job.invoices);
         });
         // return to client
         return jobList.jobs.job;
      },

      // returns details of a specific job
      getJobDetails: function(jobId){
         var jobDetailRequest = HTTP.get(workflowmaxURL + 'job.api/get/' + jobId + '?apiKey=' + apiKey + '&accountKey=' + accountKey);
         var jobDetails = parseToJson(jobDetailRequest);
         // check is array
         jobDetails.job.tasks.task = checkIsArray(jobDetails.job.tasks.task);
         // return to client
         return jobDetails.job;
      },

      // returns the costs of a specific job
      getJobCosts: function(jobId){
         var jobCostsRequest = HTTP.get(workflowmaxURL + 'job.api/costs/' + jobId + '?apiKey=' + apiKey + '&accountKey=' + accountKey);
         var jobCosts = parseToJson(jobCostsRequest);
         //check is Array
         jobCosts.costs.cost = checkIsArray(jobCosts.costs.cost);
         // return to client
         return jobCosts;
      },

      getCustomFields: function(){
         // TODO: this doesn't work :(
         // returns "invalid indentifier"
         var customFieldsRequest = HTTP.get(workflowmaxURL + 'customfield.api/definition/?apiKey=' + apiKey + '&accountKey=' + accountKey);
         var customFields;
         var customFieldsCosts;
         xml2js.parseString(customFieldsRequest.content, {
            normalizeTags: true,
            explicitArray: false
         }, function(err, data) {
            if (err) {
               customFields = err;
            } else {
               data.response.customfielddefinitions.customfielddefinition = checkIsArray(data.response.customfielddefinitions.customfielddefinition);
               customFields = data.response.customfielddefinitions.customfielddefinition;

               _.each(customFields, function (el) {
                  var id = el.id;
                  console.log(id);
                  console.log(workflowmaxURL + 'time.api/get/' + id + '/customfield?apiKey=' + apiKey + '&accountKey=' + accountKey);
                  // GET https://api.workflowmax.com/                     job.api/cost/[id]/customfield?apiKey=[your API key]&accountKey=[WorkflowMax account key]
                  var getCustomCostRequest = HTTP.get(workflowmaxURL + 'time.api/get/' + id + '/customfield?apiKey=' + apiKey + '&accountKey=' + accountKey);
                  xml2js.parseString(getCustomCostRequest.content, {
                     normalizeTags: true,
                     explicitArray: false
                  }, function (err, data) {
                     if (err) {
                        customFieldsCosts = err;
                     } else {
                        console.log(data);
                        // data.response.customfielddefinitions.customfielddefinition = checkIsArray(data.response.customfielddefinitions.customfielddefinition);
                        // customFields = data.response.customfielddefinitions.customfielddefinition;
                     }
                  });
               });
            }
         });
         // return to client
         return customFields;
      }

   });
});
