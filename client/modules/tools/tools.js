Template.tools.onCreated( function(){

    var tabIDs = {
        'developers': 'ozcs9yb',
        'designers': 'od6',
        'accounts': 'oq5732i',
        'managers': 'oluqtiy'
    };
    var tools = {};

    // google sheets has an ID for each tab, found here, search for 'full/':
    // https://spreadsheets.google.com/feeds/worksheets/1i8WWy8BWOZXVDATgLAicRzRdi3i8wmv00ZMsEerdFQ8/private/full
    $.each( tabIDs, function(key, value) {
        // console.log(key, value);
        var spreadsheetID = "1i8WWy8BWOZXVDATgLAicRzRdi3i8wmv00ZMsEerdFQ8",
        url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/" + value + "/public/full?alt=json";
        $.getJSON(url, function(data) {
            if (data) {
                var entry = data.feed.entry;
                tools[key] = entry;
                $('.tools .content .list-container').append('<ul class="' + key + '"><h4>' + key + '</h4>');
                $(entry).each(function(){
                    // Column names are title, link, desc.
                    $('.tools .content .list-container ul.' + key).append('<li style="display:none;"><a target="_blank" href=http://' + this.gsx$link.$t + '>' + this.gsx$title.$t + '</a><span class="type">'+ this.gsx$desc.$t + '</span></li>');
                }).promise().done(function(){
                    $('.tools .content .list-container ul li').fadeIn(200);
                });
            }
        });
    });
});
