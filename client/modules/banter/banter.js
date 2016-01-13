Template.friendlyBanter.onRendered(function (argument) {
  
    $('#audio-stream').audioPlayer();
    var audio = $("#audio-stream")[0];

    $('.btn-play').click(function() {
      if (!$(this).hasClass('playing')) {
        $(this).addClass('playing');
        $(this).find('span:nth-child(2)').html('Pause');
        $(this).find('span:nth-child(1)').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
        $('.player-wrapper').addClass('open');
        $('.audioplayer').addClass('audioplayer-playing');
        audio.play();

    } else {
      $(this).removeClass('playing');
      $(this).find('span:nth-child(2)').html('Play');
      $(this).find('span:nth-child(1)').toggleClass('glyphicon-pause').toggleClass('glyphicon-play');
      $('.audioplayer').removeClass('audioplayer-playing');
      audio.pause();
    }
    });

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
