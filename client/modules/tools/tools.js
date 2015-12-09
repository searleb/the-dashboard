Template.tools.onCreated( function(){

    var tabIDs = {
        'development': 'ozcs9yb',
        'creative': 'od6',
        'product-managers': 'oq5732i',
        'operations': 'oluqtiy',
        'strategy': 'oqs3meb'
    };
    // var tools = {};

    // google sheets has an ID for each tab, found here, search for 'full/':
    // https://spreadsheets.google.com/feeds/worksheets/1i8WWy8BWOZXVDATgLAicRzRdi3i8wmv00ZMsEerdFQ8/private/full
    $.each( tabIDs, function(key, value) {
        // console.log(key, value);
        var spreadsheetID = "1i8WWy8BWOZXVDATgLAicRzRdi3i8wmv00ZMsEerdFQ8",
        url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + value + "/public/full?alt=json";
        $.getJSON(url, function(data) {
            if (data) {
                var entry = data.feed.entry;
                // tools[key] = entry;
                $('.tools .content .list-container').append('<ul id="' + key + '">');
                $(entry).each(function(){
                    // Column names are title, link, desc.
                    $('.tools .content .list-container ul#' + key).append('<li style="display:none;"><a target="_blank" href=//' + this.gsx$link.$t + '>' + this.gsx$title.$t + '</a><span class="type">'+ this.gsx$desc.$t + '</span></li>');
                }).promise().done(function(){
                    $('.tools .content .list-container ul li').fadeIn(200);
                });
            }
        });
    });
});

Template.tools.onRendered( function(){
    $('ul').first().addClass('shown');
});

function showSelectedList(ulClass) {
    $('#tools .list-container ul').hide();
    $('#tools .list-container ul#' + ulClass).show();
}

Template.tools.events({
    "click button": function(e){
        var ulClass = $(e.target).attr('name');
        showSelectedList(ulClass);
    }
});
