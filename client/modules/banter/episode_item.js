Template.friendlyBanter.helpers({
  episode: function () {
      return Episodes.find(); // Where Images is an FS.Collection instance
    }
});

Template.episodeItem.events({
   'click .btn-play': function (e) {
     e.preventDefault();

    //  Take the url associated with this
    //  Create an audio element where the src is equal to the url
    //  Run audioplayer on the element
    //  Do all the fancy stuff

     var url = $('.btn-play').data("url");

     $("#player").attr("src", url);
     $('#player').audioPlayer();

     var audio = $("#player")[0];

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

   }
 });
