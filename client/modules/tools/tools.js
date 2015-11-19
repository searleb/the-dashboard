Template.tools.onCreated( function(){
    // google sheets has an ID for each tab, found here, search for 'full/':
    // https://spreadsheets.google.com/feeds/worksheets/1i8WWy8BWOZXVDATgLAicRzRdi3i8wmv00ZMsEerdFQ8/private/full
    // var spreadsheetID = "1i8WWy8BWOZXVDATgLAicRzRdi3i8wmv00ZMsEerdFQ8",
    // url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + '/' + worksheetID + "/public/full?alt=json";
    // console.log("tools " url);
    // $.getJSON(url, function(data) {
    //     if (data) {
    //         hsh.tools.showModule('tools');
    //         var entry = data.feed.entry;
    //         // console.log(data);
    //
    //         $(entry).each(function(){
    //             // Column names are title, link, desc.
    //             $('.tools .content .list-container ul').append('<li style="display:none;"><a target="_blank" href=http://' + this.gsx$link.$t + '>' + this.gsx$title.$t + '</a><span class="type">'+ this.gsx$desc.$t + '</span><span class="clearfix"></span></li>');
    //         }).promise().done(function(){
    //             $('.tools .content .list-container ul li').fadeIn(200);
    //         });
    //     };
    // });
});
