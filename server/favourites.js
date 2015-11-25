Meteor.users.deny({
  update: function() {return true;}
});

Meteor.methods({
  'addFavourite': function(name, url) {
    // This bloody line has taken about 4 hours to figure out :()
    // Meteor.users returns a COLLECTION
    // you can't call update or insert on a record if you pull it out first :( have to start with the COLLECTION
    // .update first argument matches the current user id
    // second argument can take $set or $push
    // I had to set 'favourites' = [] on account create in accounts.js
    // so you can then $push the object in to the array.
    // $push first argument is profile.favourites as in user.profile.favourites . notation.
    // wtf.
    Meteor.users.update({_id: Meteor.user()._id}, {$push: {"profile.favourites": {'name': name, 'url': url}}});
  }
});
