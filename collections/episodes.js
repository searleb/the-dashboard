FS.debug = true;

Audio = new FS.Collection('audio', {
  stores: [
        new FS.Store.GridFS("audio")
      ]
});

Episodes = new Meteor.Collection('episodes');

Episodes.allow({
  insert: function() {
    return true;
  }
});


if (Meteor.isClient) {
  Meteor.subscribe("episodes");
}
