Template.episodeUpload.events({
   'submit form': function (e) {
     e.preventDefault();

     var file = $('#file').get(0).files[0];
     var fileObj = Audio.insert(file);
     var title = $('#title').val();
     var info = $('#info').val();
     var episodeURL = '/cfs/files/audio/' + fileObj._id;

     console.log('Upload result: ', fileObj);

     Episodes.insert({
       title: title,
       file: fileObj,
       info: info,
       url: episodeURL
     });
   }
 });
