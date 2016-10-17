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
   * Save OKR - called on form submit
   */
   'okrs.submit'(newOkr) {
      const update = Okrs.update(
         { "okrs._id": newOkr._id },
         { $set: { "okrs.$": newOkr } }
      );

      if (update === 1) {
         return update;
      }
      if (update === 0) {
         throw new Meteor.Error(500, "okrs.upsert failed", update);
      }
   },

   /**
   * Add new OKR with starter objective
   */
   'okrs.addNewOkr'(userId){
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

      const update = Okrs.update(
         { "_id": userId._id },
         { $push:
            { "okrs": newOkr }
         }
      );

      if (update === 0) {
         throw new Meteor.Error(500, "okrs.addNewOkr failed", update)
      }

   },

   /**
   * Add new objective to an OKR
   */
   'okrs.addObjective'(okrId){
      const newObjective = {
         _id: new Mongo.ObjectID().valueOf(),
         description: "",
         progress: 0,
      };

      const update = Okrs.update(
         { "okrs._id": okrId },
         { $push: { "okrs.$.objectives": newObjective } }
      );

      if (update === 0) {
         throw new Meteor.Error(500, "okrs.addObjective failed", update)
      }
   },

   /**
   * Delete objective from an OKR
   */
   'okrs.deleteObjective'(objectiveId){
      const update = Okrs.update(
         { 'okrs.objectives._id': objectiveId },
         { $pull: { 'okrs.$.objectives': { '_id': objectiveId } } }
      );

      if (update === 0) {
         throw new Meteor.Error(500, "okrs.deleteObjective failed", update)
      }
   },

   /**
   * Delete the whole OKR
   */
   'okrs.deleteOkr'(okrId){
      const update = Okrs.update(
         { 'okrs._id': okrId },
         { $pull: { 'okrs': {'_id': okrId } } }
      );

      if (update === 0) {
         throw new Meteor.Error(500, "okrs.deleteOkr failed", update)
      }
   },

   /**
   * Inserts a new OKR entry for every new person
   */
   'okrs.starter'(newRecord) {
      const insert = Okrs.insert(newRecord);

      if (insert === 0) {
         throw new Meteor.Error(500, "okrs.deleteOkr failed", update)
      }
   },

   /**
    *  Update all OKR totalProgress
    */
   'okrs.updateOkrsTotal'(userId) {
      const totals = Okrs.findOne(
         { '_id': userId },
         { 'fields': { 'okrs.totalProgress': 1, '_id': 0 } }
      );

      let totalPercentage = totals.okrs.reduce((prev, current) => prev.totalProgress + current.totalProgress );
      totalPercentage = Math.floor(totalPercentage / totals.okrs.length);

      const update = Okrs.update(
         { '_id': userId },
         { $set: {'okrsTotalProgress': totalPercentage } }
      );
   }
});
