Template.weather.onCreated(function(){
   // get time for each studio
   Meteor.setInterval(function(){
      var time = moment();
      // Sydney
      var timezoneSyd = moment.tz(time, 'Australia/Sydney').format("h:mm");
      var amPmSyd = moment.tz(time, 'Australia/Sydney').format("a");
      var sydTimeObj = {
         'time': timezoneSyd,
         'ampm': amPmSyd
      };
      Session.set("sydTime", sydTimeObj);
      // London
      var timezoneLdn = moment.tz(time, 'Europe/London').format("h:mm");
      var amPmLdn = moment.tz(time, 'Europe/London').format("a");
      var ldnTimeObj = {
         'time': timezoneLdn,
         'ampm': amPmLdn
      };
      Session.set("ldnTime", ldnTimeObj);
   }, 1000);


   function getSydWeather() {
      $.simpleWeather({
         location: 'Sydney, AUS',
         unit: 'c',
         success: function(weather) {
            console.log(weather);
            var sydWeather = {
               "currently": weather.currently,
               "high": weather.high,
               "low": weather.low,
               "sunrise": weather.sunrise,
               "sunset": weather.sunset,
               "temp": weather.temp,
               "code": weather.code,
               "units": weather.units.temp
            };
            Session.set("sydWeather", sydWeather);
         },
         error: function(error) {
            console.log(error);
         }
      });
   }
   function getLdnWeather() {
      $.simpleWeather({
         location: 'London, UK',
         unit: 'c',
         success: function(weather) {
            console.log(weather);
            var ldnWeather = {
               "currently": weather.currently,
               "high": weather.high,
               "low": weather.low,
               "sunrise": weather.sunrise,
               "sunset": weather.sunset,
               "temp": weather.temp,
               "code": weather.code,
               "units": weather.units.temp
            };
            Session.set("ldnWeather", ldnWeather);
         },
         error: function(error) {
            console.log(error);
         }
      });
   }

   getSydWeather();
   getLdnWeather();
   Meteor.setTimeout(function(){
      getSydWeather();
      getLdnWeather();
   }, (1000 * 60) * 30);


});

Template.weather.helpers({
   sydTime: function(){
      return Session.get("sydTime");
   },
   ldnTime: function() {
      return Session.get("ldnTime");
   },
   sydWeather: function(){
      return Session.get("sydWeather");
   },
   ldnWeather: function(){
      return Session.get("ldnWeather");
   }
});
