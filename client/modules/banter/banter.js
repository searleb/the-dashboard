Template.friendlyBanter.onRendered(function (argument) {

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

    $(document).on('change', '.btn-file :file', function() {
      var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
    });

    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }

    });

});

Template.friendlyBanter.events({
   'click #upload-ep' : function (e) {
      e.preventDefault();
      $('#upload-modal').modal();
   }
});
