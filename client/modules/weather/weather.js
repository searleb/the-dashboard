// Docs at http://simpleweatherjs.com
$(document).ready(function() {

    function sydWeather() {
        var options = {
            location: 'Sydney, AUS',
            unit: 'c',
            success: function(weather) {
                html = '<i class="sw icon-'+weather.code+'"></i>';
                html += '<span>'+weather.temp+'&deg;'+weather.units.temp+'</span>';
                html += '<span class="currently">&nbsp;&amp;&nbsp;'+weather.currently+'</span>';

                $(".weather-syd").html(html);
            },
            error: function(error) {
                $(".weather-syd").html('<p>'+error+'</p>');
            }
        };

        Weather.options = options;
        Weather.load();
    }

    function ldnWeather() {
        var optionsLDN = {
            location: 'London, UK',
            unit: 'c',
            success: function(weather) {
                html = '<i class="sw icon-'+weather.code+'"></i>';
                html += '<span>'+weather.temp+'&deg;'+weather.units.temp+'</span>';
                html += '<span class="currently">&nbsp;&amp;&nbsp;'+weather.currently+'</span>';

                $(".weather-ldn").html(html);
            },
            error: function(error) {
                $(".weather-ldn").html('<p>'+error+'</p>');
            }
        };

        Weather.options = optionsLDN;
        Weather.load();
    }

    sydWeather();
    ldnWeather();
    setInterval(function () {
        sydWeather();
        ldnWeather();
    }, (1000 * 60) * 30);


    // get time for each studio
    setInterval(function(){
        var time = moment();
        // Sydney
        var timezoneSyd = moment.tz(time, 'Australia/Sydney').format("h:mm");
        var amPmSyd = moment.tz(time, 'Australia/Sydney').format("a");
        $('.studio-status .time-syd').html(timezoneSyd + '<small>' + amPmSyd + '</small>');
        // London
        var timezoneLdn = moment.tz(time, 'Europe/London').format("h:mm");
        var amPmLdn = moment.tz(time, 'Europe/London').format("a");
        $('.studio-status .time-ldn').html(timezoneLdn  + '<small>' + amPmLdn + '</small>');
    }, 1000);

});
