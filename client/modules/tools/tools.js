function showSelectedList(id) {
    $('#tools .list-container ul').hide();
    $('#tools .list-container ul#' + id).show();
}

Template.tools.onCreated( function(){
    var tabIDs = {
        'development': 'ozcs9yb',
        'creative': 'od6',
        'product-managers': 'oq5732i',
        'operations': 'oluqtiy',
        'strategy': 'oqs3meb'
    };
    var tools = [];

    // google sheets has an ID for each tab, found here, search for 'full/':
    // https://spreadsheets.google.com/feeds/worksheets/1i8WWy8BWOZXVDATgLAicRzRdi3i8wmv00ZMsEerdFQ8/private/full
    $.each( tabIDs, function(key, value) {
        var spreadsheetID = "1i8WWy8BWOZXVDATgLAicRzRdi3i8wmv00ZMsEerdFQ8",
        url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + value + "/public/full?alt=json";
        $.getJSON(url, function(data) {
            if (data) {
                var entry = data.feed.entry;
                $(entry).each(function(){
                    var toolsObj = {};
                    toolsObj.id = key;
                    toolsObj.link = this.gsx$link.$t;
                    toolsObj.title = this.gsx$title.$t;
                    toolsObj.desc = this.gsx$desc.$t;
                    tools.push(toolsObj);
                    Session.set('tools', tools);
                });
            }
        });
    });

});

Tracker.autorun(function () {
    // watch the session userRole and update page if it changes
    var userRole = Session.get("userRole");
    console.log('userRole', userRole);
    showSelectedList(userRole);
});

Template.tools.events({
    "click button": function(e){
        var id = $(e.target).attr('name');
        showSelectedList(id);
    }
});

Template.tools.helpers({
    creative: function(){
        var tools = Session.get('tools');
        var creative = _.where(tools, {id: "creative"});
        return creative;
    },
    development: function(){
        var tools = Session.get('tools');
        var development = _.where(tools, {id: "development"});
        return development;
    },
    operations: function(){
        var tools = Session.get('tools');
        var operations = _.where(tools, {id: "operations"});
        return operations;
    },
    productManagers: function(){
        var tools = Session.get('tools');
        var productManagers = _.where(tools, {id: "product-managers"});
        return productManagers;
    },
    strategy: function(){
        var tools = Session.get('tools');
        var strategy = _.where(tools, {id: "strategy"});
        return strategy;
    }
});
