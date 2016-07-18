Okrs = new Mongo.Collection("okrs");
Okrs.allow({
   insert: function(){
      return true;
   },
   update: function(){
      return true;
   },
   remove: function(){
      return true;
   }
});


if (Meteor.isServer){
   Meteor.publish("okrs", function okrsPublication(userId){
      if (userId) {
         return Okrs.find({"_id": userId});
      }
   });
}

Meteor.methods({
   /**
   * Called on form submit
   */
   'okrs.upsert'(newOkr) {
      console.log("NewOkr: ", newOkr);

      const newOkrId = newOkr.id;

      const found = Okrs.update(
         { "okrs.id": newOkrId },
         { $set: { "okrs.$": newOkr } }
      );

      console.warn("FOUND", found);

   },




   /**
   *
   */
   'okrs.addNewOkr'(userId){
      console.warn(userId._id);
      const newOkr = {
         "id": new Mongo.ObjectID()._str,
         "title": '',
         "objectives":[
            {
               "id": new Mongo.ObjectID()._str,
               "description": "",
               "progress": 0,
            },
         ]
      };

      Okrs.update(
         { "_id": userId._id },
         { $push:
            { "okrs": newOkr }
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
