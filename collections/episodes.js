FS.debug = true;

Audio = new FS.Collection('audio', {
  stores: [
        new FS.Store.GridFS("audio", {
          beforeWrite: function(fileObj) {
            return {
              extension: 'wav',
              type: 'audio/wav'
            };
          },
        })
      ]
});

Episodes = new Meteor.Collection('episodes');
