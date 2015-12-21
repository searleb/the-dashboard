Template.search.events({
    "submit .search-drive": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        var searchTerm = event.target.search.value;
        // Clear form
        event.target.search.value = "";

        function goSearch(searchTerm, site) {
            switch (site) {
                case 'drive':
                    var url = "https://drive.google.com/drive/#search?q=" + searchTerm;
                    window.open(url, '_blank');
                    break;
                case 'giphy':
                    var url = "http://giphy.com/search/" + searchTerm;
                    window.open(url, '_blank');
                    break;
                default:
                    return;
            }
        }

        if (searchTerm.length === 0) {
            return;
        } else {
            var searchSubstring = searchTerm.substring(0, 4);
            if (searchSubstring == 'gif:') {
                searchTerm = searchTerm.replace('gif:', '');
                searchTerm = $.trim(searchTerm);
                goSearch(searchTerm, 'giphy');
            } else {
                searchTerm = $.trim(searchTerm);
                goSearch(searchTerm, 'drive');
            }
        }
    },
    "submit .search-wiki": function (event) {
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
