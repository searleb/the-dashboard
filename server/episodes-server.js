Meteor.publish('audio', function () {
  return Audio.find();
});

Audio.allow({
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    },
    read: function () {
      return true;
    },
    write: function () {
      return true;
    }
});
