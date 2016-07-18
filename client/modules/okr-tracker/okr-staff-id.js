Template.okrsStaffId.onCreated(function(){
   Meteor.subscribe('okrs');
});

Template.okrsStaffId.events({
   'submit .okr-entry-form'(event) {
      event.preventDefault();

      const okr = {
         id: event.target.id,
         title: event.target[0].value,
         objectives: []
      };

      _.each(event.target, function(target, i) {

         if (target.type == "fieldset") {

            const newObjective = {
               id: target.attributes[0].value || Meteor.ObjectID().str,
               description: title = target.elements[0].value,
               progress: title = target.elements[1].value,
            };
            okr.objectives.push(newObjective);
            console.log(okr);
         }

      });

      Meteor.call("okrs.upsert", okr, function(error, result){
         if(error){
            console.log("error", error);
         }
         if(result){

         }
      });
   },
   'click .add-new-objective'(event){
      console.log("click event");
      console.log(event);
      var id = event.target.dataset.id;

      Meteor.call("okrs.addObjective", id, function(error, result){
         if(error){
            console.log("error", error);
         }
         if(result){

         }
      });
   },
   'click .add-new-okr'(event){
      console.log("click event");
      console.log(event);
      // var id = event.target.dataset.id;

      Meteor.call("okrs.addNewOkr", {}, function(error, result){
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
