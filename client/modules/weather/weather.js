// Docs at http://simpleweatherjs.com
$(document).ready(function() {

    function sydWeather() {
        var options = {
            location: 'Sydney, AUS',
            unit: 'c',
            success: function(weather) {
                html = '<h2><i class="sw icon-'+weather.code+'"></i> ';
                html += weather.temp+'&deg;'+weather.units.temp+'</h2>';
                html += '<ul><li>'+weather.city+'</li>';
                html += '<li class="currently">'+weather.currently+'</li>';

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
                html = '<small><i class="sw icon-'+weather.code+'"></i> ';
                html += weather.temp+'&deg;'+weather.units.temp+'</small>';
                html += '<ul><li>'+weather.city+'</li>';
                html += '<li class="currently">'+weather.currently+'</li>';

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
    }, 10000 * 30);


    // get time for each studio
    setInterval(function(){
        var time = moment();
        // Sydney
        var timezoneSyd = moment.tz(time, 'Australia/Sydney').format("h:mm");
        var amPmSyd = moment.tz(time, 'Australia/Sydney').format("a");
        $('.studio-status .time-syd').html(timezoneSyd);
        $('.studio-status .am-pm-syd').html(amPmSyd);
        // London
        var timezoneLdn = moment.tz(time, 'Europe/London').format("h:mm");
        var amPmLdn = moment.tz(time, 'Europe/London').format("a");
        $('.studio-status .time-ldn').html(timezoneLdn);
        $('.studio-status .am-pm-ldn').html(amPmLdn);
    }, 1000);

});
