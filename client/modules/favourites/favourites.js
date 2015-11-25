Template.favourites.events({
    "submit #add-favourite": function (event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        console.log(event.target);
            var favouriteName = event.target.favouriteName.value,
                favouriteUrl = event.target.favouriteUrl.value;
        // Clear form
        event.target.favouriteName.value = "";
        event.target.favouriteUrl.value = "";

        Meteor.call('addFavourite', favouriteName, favouriteUrl);
    }
});

Template.favourites.helpers({
    favourites: function() {
        return Meteor.user().profile.favourites;
    }
});
