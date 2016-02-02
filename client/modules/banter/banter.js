Template.friendlyBanter.helpers({
  episodes: function () {
      return Audio.find({});
    }
});

Template.friendlyBanter.events({
   'click #upload-ep' : function (e) {
      e.preventDefault();
      $('#upload-modal').modal();
   }
});

Template.friendlyBanter.onRendered(function (argument) {

    Audio.resumable.assignBrowse($('#browseButton'));

    $('li:not(:first-child)').hover(function(){
                $('.latest').css("opacity",".8");
      }, function() {
        $('.latest').css("opacity","1");
    });

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
