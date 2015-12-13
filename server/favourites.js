Meteor.users.deny({
  update: function() {return true;}
});

Meteor.methods({
  'addFavourite': function(name, url) {
    Meteor.users.update({_id: Meteor.user()._id}, {$push: {"profile.favourites": {'name': name, 'url': url}}});
  }
});
