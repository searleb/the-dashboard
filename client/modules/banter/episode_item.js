Template.friendlyBanter.helpers({
  episode: function () {
      return Episodes.find({}, {sort: {createdAt : -1}});
    }
});

Template.episodeItem.events({
   'click .btn-play': function (e) {
     e.preventDefault();

     var url = $('.btn-play').data("url");
     var audio;

     if (!$('.btn-play').hasClass('playing')) {

       $('#player').audioPlayer();
       $("#player").attr("src", url);
       audio = $("#player")[0];

       $('.btn-play').addClass('playing');
       $('.btn-play').find('span').html('Pause');
       $('.btn-play').find('i').toggleClass('fa-play').toggleClass('fa-pause');
       $('.player-wrapper').addClass('open');
       $('.audioplayer').addClass('audioplayer-playing');
       audio.play();

     } else {
       audio = $("#player")[0];
       $('.btn-play').removeClass('playing');
       $('.btn-play').find('span').html('Play');
       $('.btn-play').find('i').toggleClass('fa-pause').toggleClass('fa-play');
       $('.audioplayer').removeClass('audioplayer-playing');
       audio.pause();
      }

   }
 });
