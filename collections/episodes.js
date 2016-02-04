// Create a file collection, and enable file upload and download using HTTP
Audio = new FileCollection('audio', {
   resumable: true, // Enable built-in resumable.js upload support
   resumableIndexName: 'mfb',
   http: [{
      method: 'get',
      path: '/md5/:md5', // this will be at route "/gridfs/myFiles/md5/:md5"
      lookup: function(params, query) { // uses express style url params
         return {
            md5: params.md5
         }; // a query mapping url to myFiles
      }
   }]
});
