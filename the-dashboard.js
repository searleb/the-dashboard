if (Meteor.isClient) {
    // helper to convert objects to arrays for use in blaze templates
    UI.registerHelper("arrayify", function(obj){
        result = [];
        for (var key in obj){
            result.push({name:key,value:obj[key]});
        }
        return result;
    });
}
