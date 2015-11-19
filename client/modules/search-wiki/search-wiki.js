Template.searchWiki.events({
    "submit .search-drive": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        var searchTerm = event.target.search.value;
        searchTerm = $.trim(searchTerm);

        // Clear form
        event.target.search.value = "";
        if (searchTerm.length === 0) {
            return;
        } else {
            url = "https://sites.google.com/a/mentallyfriendly.com/new-mf-wiki/system/app/pages/search?scope=search-site&q=" + searchTerm;
            window.open(url, '_blank');
        }
    }
});
