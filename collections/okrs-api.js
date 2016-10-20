Okrs = new Mongo.Collection("okrs");
OkrDates = new Mongo.Collection("okrDates");

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

OkrDates.allow({
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
         return Okrs.find(
            { "_id": userId },
         );
      }
   });
   Meteor.publish('okrDates', () => {
      return OkrDates.find({})
   })
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
   * Add new OKR with starter objective to first position in the array
   */
   'okrs.addNewOkr'(userId){
      const newOkr = {
         "_id": new Mongo.ObjectID().valueOf(),
         "title": "",
         "totalProgress": 0,
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
         { $push: { "okrs": { $each: [newOkr], $position: 0 } } }
      );

      if (update === 0) {
         throw new Meteor.Error(500, "okrs.addNewOkr failed", update)
      }
      if (update === 1) {
         return update
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

      let totalPercentage = 0;

      totals.okrs.forEach((okr) => {
         totalPercentage += okr.totalProgress;
      });

      totalPercentage = Math.floor(totalPercentage / totals.okrs.length);

      const update = Okrs.update(
         { '_id': userId },
         { $set: {'okrsTotalProgress': totalPercentage } }
      );

      if (update === 0 || totals === 0) {
         throw new Meteor.Error(500, "okrs.updateOkrsTotal failed", update)
      }
   },

   /**
   * Added
   */
   'okrDates.addNewYear'(year) {
      const yearObj = {
         year: year,
         quarters: [1,2,3,4]
      }
      const date = OkrDates.upsert({}, { $push: { years: yearObj } })

      if (date === 0) {
         throw new Meteor.Error(500, "okrDates.addNewYear failed", date)
      }
   },

   /**
   * Returns the last year recorded
   */
   'okrDates.getLastYear'() {
      const okrDates = OkrDates.find({}).fetch()
      let lastRecordedYear = 0

      if (okrDates.length > 0) {
         const arrayLength = okrDates[0].years.length -1
         lastRecordedYear = okrDates[0].years[arrayLength].year
      }

      return lastRecordedYear;
   }
});
