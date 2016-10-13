// Template.okrsStaffId.onCreated(function(){
//    Meteor.subscribe('okrs');
// });


Template.okrsStaffId.events({
   'submit .okr-entry-form'(event) {
      event.preventDefault();

      console.log(event);
      const okr = {
         _id: event.target.id,
         title: event.target[0].value,
         objectives: []
      };

      _.each(event.target, function(target, i) {
         if (target.type == "fieldset") {
            const newObjective = {
               _id: target.attributes[0].value || new Meteor.ObjectID().valueOf(),
               description: target.elements[0].value,
               progress: target.elements[1].value,
            };
            okr.objectives.push(newObjective);
         }

      });

      Meteor.call("okrs.upsert", okr, function(error, result){

         if(error){
            console.error("error", error);
         }
         if(result){
            console.log(result);
         }
      });
   },


   'click .add-new-objective'(event){
      console.log("click event - new objective");
      console.log(event);
      var id = event.target.dataset.id;

      Meteor.call("okrs.addObjective", id, function(error, result){
         if(error){
            console.error("error", error);
         }
         if(result){
            console.log(result);
         }
      });
   },


   'click .add-new-okr'(event){
      console.log("click event");
      console.log(event);
      // var id = event.target.dataset.id;
      const _id = Router.current().params.id;
      Meteor.call("okrs.addNewOkr", { _id }, function(error, result){
         if(error){
            console.log("error", error);
         }
         if(result){

         }
      });
   },


   'click .remove-objective'(event){
      console.log(event);

      var objectiveId = event.target.getAttribute('data-objective-id');

      Meteor.call("okrs.removeObjective", objectiveId, function(error, result){
         if(error){
            console.log("error", error);
         }
         if(result){

         }
      });
   },

   'click .delete-okr'(event){
      console.log(event);

      var okrId = event.target.getAttribute('data-okr-id');

      Meteor.call("okrs.deleteOkr", okrId, function(error, result){
         if(error){
            console.log("error", error);
         }
         if(result){

         }
      });
   }
});

Template.okrsStaffId.helpers({
   staffList() {
      const id = Router.current().params.id;
      return Okrs.find({"_id": id}).fetch();
   }
});
