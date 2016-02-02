Meteor.startup(function() {

 Audio.resumable.on('fileAdded', function (file) {

   var number = $('#number').val();
   var title = $('#title').val();
   var info = $('#info').val();

   Audio.insert({
     _id: file.uniqueIdentifier,
     filename: file.fileName,
     contentType: file.file.type,
     metadata: {
       number: number,
       title: title,
       info: info
       }
     },
     function (err, _id) {  // Callback to .insert
       if (err) { return console.error("File creation failed!", err); }
       // Once the file exists on the server, start uploading
       Audio.resumable.upload();
     }

   );
 });

});
