if (Meteor.isClient) {

   Packery = {
      options: {
         itemSelector: '.module',
         gutter: 15,
         stamp: '.stamp',
         percentPosition: true
      },
      init: function() {
         Meteor.setTimeout(function(){
            $('.home-wrapper').packery(this.options);
         }, 100);
      },
      layout: function(){
         var $grid = $('.home-wrapper').packery(this.options);
         Meteor.setTimeout(function(){
            $grid.packery('layout');
         }, 100);
      },
      destroy: function(){
         var $grid = $('.home-wrapper').packery(this.options);
         $grid.packery('destroy');
      }
   };


   // helper to convert objects to arrays for use in blaze templates
   UI.registerHelper("arrayify", function(obj){
      result = [];
      for (var key in obj){
         result.push({name:key,value:obj[key]});
      }
      return result;
   });

   // format time
   UI.registerHelper('formatTime', function(time, formatting) {
      if(formatting) {
         return moment(time).format(formatting);
      }
   });

   // format time
   UI.registerHelper('dateToday', function() {
      return moment().format('DD MMM YY');
   });

   // add global event listener to window to check if window is in focus
   tabIsFocused = true;
   window.addEventListener('focus', function() {
      tabIsFocused = true;
   },false);

   window.addEventListener('blur', function() {
      tabIsFocused = false;
   },false);
}
