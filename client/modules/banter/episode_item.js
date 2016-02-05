Template.episodeItem.helpers ({
   link: function () {
      return Audio.baseURL + "/md5/" + this.md5;
   },
   title: function () {
      return this.metadata.title;
   },
   number: function () {
      return this.metadata.number;
   },
   description: function () {
      return this.metadata.info;
   }
});

Template.episodeItem.events({
   'click .btn-play': function (e) {
      e.preventDefault();

      var $button = $(e.currentTarget);
      var url = Audio.baseURL + "/md5/" + this.md5;
      var title = this.metadata.title;
      var number = this.metadata.number;
      var audioPlayer = $("#player")[0];

      // open the player
      $('.player-wrapper').addClass('open');

      // show loading spinner
      $('.loader').show();
      // hide audio bar
      $('.audioplayer').hide();
      // set the audio player source
      $("#player").attr("src", url);
      // set the player episode number
      $(".player-info span.episode-number").html("Episode" + '&nbsp;' + number);
      // set the player title
      $(".player-info h3.episode-title").html(title);



      // when audio is ready to start playing
      audioPlayer.oncanplay = function (e) {
        // hide loading spinner
        $('.loader').fadeOut();
        // hide audio bar
        $('.audioplayer').fadeIn(800);
        // mimic the plugin and add playing class
        $('.audioplayer').addClass('audioplayer-playing');
        // start the loaded track
        audioPlayer.play();
      };

      // remove any other active classes
      $('.scroll-area li').removeClass('active');
      // then add active class to playing li item
      $button.parent('li').addClass('active');
   }
});
