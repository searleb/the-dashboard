if (Meteor.isClient) {
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
}
