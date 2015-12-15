if (Meteor.isClient) {
    // helper to convert objects to arrays for use in blaze templates
    UI.registerHelper("arrayify", function(obj){
        result = [];
        for (var key in obj){
            result.push({name:key,value:obj[key]});
        }
        return result;
    });

    // Used in settings to check radio number if ==
    UI.registerHelper('isChecked', function (val1, val2, options) {
        if (arguments.length < 3) {
            throw new Error("ifChecked needs 2 params");
        }
        if (val1 == val2) {
            return true;
        } else {
            return false;
        }
    });
}

//
// if (Meteor.isServer) {
//
// }
