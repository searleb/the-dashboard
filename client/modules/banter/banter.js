Template.friendlyBanter.helpers({
   episodes: function () {
      return Audio.find({}, {sort: {uploadDate: -1}});
   }
});

Template.friendlyBanter.onRendered(function(){
   // init the player

   var player = $('#player');
   player.audioPlayer();


   // added upload event watcher
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
      });
   });

});

Template.friendlyBanter.events({
   'click #upload-ep' : function (e) {
      e.preventDefault();
      $('#upload-modal').modal();
   },
   'change form.upload input': function(e) {
      // dodgy form validation :)
      // It just checks that each input has some value and then enables the upload button
      e.preventDefault();
      var valid = 0;
      var inputs = $('form.upload input');
      inputs.each(function(index, el) {
         if ( el.value ){
            valid += 1;
         }
         if (valid == inputs.length - 1) {
            $('#browseButton').attr('disabled', false);
         }
      });
   }
});

Template.friendlyBanter.onRendered(function (argument) {

   Audio.resumable.assignBrowse($('#browseButton'));

   // $('li').hover(function(){
   //    $('.latest').css("opacity",".8");
   // }, function() {
   //    $('.latest').css("opacity","1");
   // });
   //

   //set first list item to active
   $('.scroll-area ul li').first().addClass('active');

   $(document).on({
      mouseenter: function () {
         var $target = $(this).find('#episode-info');
         $target.collapse('show');
      },

      mouseleave: function () {
         var $target = $(this).find('#episode-info');
         $target.collapse('hide');
      }
   }, '.scroll-area li');

});
