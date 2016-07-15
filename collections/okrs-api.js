Okrs = new Mongo.Collection("okrs");

if (Meteor.isServer){
   Meteor.publish("okrs", function okrsPublication(userId){
      if (userId) {
         return Okrs.find({"_id": userId});
      } else {
         return Okrs.find();
      }
   });
}

Meteor.methods({
   'okrs.upsert'(newOkr) {
      console.log("NewOkr: ", newOkr);

      // Make sure the user is logged in before inserting a okrs
      if (! this.userId) {
         throw new Meteor.Error('not-authorized');
      }
      /**
      * Find the user
      * Find the OKR
      * Find the OKR objective
      */
      // var user = Okrs.find({_id: Meteor.userId()});
      var newOkrId = newOkr.id;

      var found = Okrs.update(
         { "okrs.id": newOkrId },
         { $set: { "okrs.$": newOkr } }
      );

      console.log("FOUND", found);

   },
   'okrs.starter'(newRecord) {
      Okrs.insert(newRecord);
   }
});
