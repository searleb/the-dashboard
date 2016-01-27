Template.friendlyBanter.helpers({
  episode: function () {
      return Episodes.find({}, {sort: {createdAt : -1}});
    }
});

Template.episodeItem.events({
   'click .btn-play': function (e) {
     e.preventDefault();

     var url = $(e.currentTarget).data("url");
     var title = $(e.currentTarget).data("title");
     var number = $(e.currentTarget).data("number");
     var audio;

     if (!$(e.currentTarget).hasClass('playing')) {

       $('#player').audioPlayer();
       $("#player").attr("src", url);
       $(".player-info span.episode-number").html("Episode" + '&nbsp;' + number);
       $(".player-info h3.episode-title").html(title);
       audio = $("#player")[0];


       $(e.currentTarget).addClass('playing');
       $(e.currentTarget).find('span').html('Pause');
       $(e.currentTarget).find('i').toggleClass('fa-play').toggleClass('fa-pause');
       $('.player-wrapper').addClass('open');
       $('.audioplayer').addClass('audioplayer-playing');
       audio.play();

     } else {
       audio = $("#player")[0];
       $(e.currentTarget).removeClass('playing');
       $(e.currentTarget).find('span').html('Play');
       $(e.currentTarget).find('i').toggleClass('fa-pause').toggleClass('fa-play');
       $('.audioplayer').removeClass('audioplayer-playing');
       audio.pause();
      }

   }
 });
