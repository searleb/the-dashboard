Meteor.users.deny({
    update: function() {return true;}
});
// TODO:
// This is a bit crap, I think is should be a new Collection with each entry saved with the user id it belongs to.
// Will be much easier to update and delete as at the moment it's just an array with no id's.
Meteor.methods({
    'addFavourite': function(name, url) {
        Meteor.users.update({_id: Meteor.user()._id}, {$push: {"profile.favourites": {'name': name, 'url': url}}});
    }
});
