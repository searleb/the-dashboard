Okrs = new Mongo.Collection("okrs");

if (Meteor.isServer){
   Meteor.publish("okrs", function okrsPublication(userId){
      if (userId) {
         return Okrs.find({"_id": userId});
      }
   });
}

Meteor.methods({
   /**
   *
   */
   'okrs.upsert'(newOkr) {
      console.log("NewOkr: ", newOkr);

      const newOkrId = newOkr.id;

      const found = Okrs.update(
         { "_id": Meteor.userId(), "okrs.id": newOkrId },
         { $set: { "okrs.$": newOkr } }
      );

      console.warn("FOUND", found);

   },




   /**
   *
   */
   'okrs.addNewOkr'(){
      console.log("method");

      Okrs.update(
         {"_id": Meteor.userId()},
         { $push:
            { okrs:
               {
                  id: new Mongo.ObjectID()._str,
                  title: "",
                  objectives:{
                     complete: false,
                     description: "",
                     progress: 0,
                  }
               }
            }
         }
      );

   },




   /**
   *
   */
   'okrs.addObjective'(OkrId){
      console.log("method");

      var newObjective = {
         id: new Mongo.ObjectID()._str,
         description: "",
         progress: 0,
         complete: false
      };

      var insert = Okrs.update(
         { "okrs.id": OkrId },
         { $push: { "okrs.$.objectives": newObjective } }
      );
      console.log(insert);

   },



   'okrs.starter'(newRecord) {
      Okrs.insert(newRecord);
   }
});
