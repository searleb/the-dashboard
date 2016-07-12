Okrs = new Mongo.Collection("okrs");

if (Meteor.isServer){
   Meteor.publish("okrs", function okrsPublication(argument){
      return Okrs.find();
   });
}

Meteor.methods({
   'okrs.insert'(text) {
      check(text, String);

      // Make sure the user is logged in before inserting a okrs
      if (! this.userId) {
         throw new Meteor.Error('not-authorized');
      }

      Okrs.insert({
         _id: this.userId,
         text,
         createdAt: new Date(),
         username: Meteor.users.findOne(this.userId).profile.name,
      });
   },
   'okrs.remove'(okrsId) {
      check(okrsId, String);

      Okrs.remove(okrsId);
   },
   'okrs.setChecked'(okrsId, setChecked) {
      check(okrsId, String);
      check(setChecked, Boolean);

      Okrs.update(okrsId, { $set: { checked: setChecked } });
   },
   'okrs.starter'(newRecord) {
      Okrs.insert(newRecord);
   }
});
