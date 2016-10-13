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


      const found = Okrs.update(
         { "okrs._id": newOkr._id },
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
         "_id": new Mongo.ObjectID().valueOf(),
         "title": '',
         "objectives":[
            {
               "_id": new Mongo.ObjectID().valueOf(),
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
   'okrs.addObjective'(okrId){
      console.log("method");
      var newObjective = {
         _id: new Mongo.ObjectID().valueOf(),
         description: "",
         progress: 0,
         complete: false
      };

      var insert = Okrs.update(
         { "okrs._id": okrId },
         { $push: { "okrs.$.objectives": newObjective } }
      );
      console.log(insert);

   },


/**
 *
 */
   'okrs.removeObjective'(objectiveId){
      // console.log('objectiveId: ', objectiveId);

      var remove = Okrs.update(
         { 'okrs.objectives._id': objectiveId },
         { $pull: { 'okrs.$.objectives': { '_id': objectiveId } } }
      );

      // console.log("remove: ", remove);

   },





   'okrs.deleteOkr'(okrId){
      console.log("deleteOkr: ",okrId);

      // var who = Okrs.find({ "_id": userId });
      // console.log("who", who.fetch());


      var remove = Okrs.update(
         { 'okrs._id': okrId },
         { $pull: {'okrs': {'_id': okrId } } }
      );

      console.log("remove: ", remove);

   },






   'okrs.starter'(newRecord) {
      Okrs.insert(newRecord);
   }
});
