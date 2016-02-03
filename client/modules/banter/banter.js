Template.friendlyBanter.helpers({
   episodes: function () {
      return Audio.find({});
   }
});

Template.friendlyBanter.onRendered(function(){
   // init the player
   $('#player').audioPlayer();
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
   $('.scroll-area ul li').last().addClass('active');

   Meteor.setTimeout(function(){
      $("html, body").animate({ scrollTop: $(document).height() }, 1200, 'swing');
   }, 750);


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
