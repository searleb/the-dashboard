Template.okrsStaffId.events({
   /**
   * On submit of an OKR form,
   * create a new okr object,
   * loop over all the fieldsets which contain an objective,
   * push each objective in to the okr object,
   * pass in the new okr to the api to be saved to Mongo,
   * and work out the total completion % by taking the average
   */
   'submit .okr-entry-form'(event) {
      event.preventDefault();

      const okr = {
         _id: event.target.id,
         title: event.target[0].value,
         totalProgress: 0,
         year: Session.get('okrYear'),
         quarter: Session.get('okrQuarter'),
         objectives: []
      };

      let objectiveCount = 0;

      _.each(event.target, function(target, i) {
         if (target.type == "fieldset") {

            objectiveCount ++;

            const newObjective = {
               _id: target.attributes[0].value || new Meteor.ObjectID().valueOf(),
               description: target.elements[0].value,
               progress: parseInt(target.elements[1].value),
            };

            okr.objectives.push(newObjective);

            okr.totalProgress += parseInt(newObjective.progress);
         }
      });

      okr.totalProgress = Math.floor(okr.totalProgress / objectiveCount);

      Meteor.call("okrs.submit", okr, function(error, result){
         if(error){
            console.error("error", error);
         }
         if (result === 1) {
            $(event.target).parent().addClass('success');
            Meteor.setTimeout(() => {
               $(event.target).parent().removeClass('success');
            }, 750)
         }
      });

      Meteor.call("okrs.updateOkrsTotal", Router.current().params.id);
   },

   /**
   * Add new objective
   */
   'click .add-new-objective'(event){
      const id = event.target.dataset.id;

      Meteor.call("okrs.addObjective", id, function(error, result){
         if(error){
            console.error("error", error);
         }
      });
   },

   /**
   * Add new OKR
   */
   'click .add-new-okr'(event){
      const _id = Router.current().params.id;
      const year = Session.get('okrYear');
      const quarter = Session.get('okrQuarter');

      Meteor.call("okrs.addNewOkr", _id, year, quarter , function(error, result){
         if(error){
            console.error("error", error);
         }
      });

      Meteor.call("okrs.updateOkrsTotal", _id, function(error, result){
         if(error){
            console.error("error", error);
         }
      });

      Meteor.setTimeout(() => {
         $('.module .title-wrapper input').first().focus();
      }, 25)
   },

   /**
   * Delete objective
   */
   'click .delete-objective'(event){
      const objectiveId = event.target.getAttribute('data-objective-id');

      Meteor.call("okrs.deleteObjective", objectiveId, function(error, result){
         if(error){
            console.error("error", error);
         }
      });
   },

   /**
   * Delete OKR
   */
   'click .delete-okr'(event){
      const okrId = event.target.getAttribute('data-okr-id');

      Meteor.call("okrs.deleteOkr", okrId, function(error, result){
         if(error){
            console.error("error", error);
         }
      });
   },

   /**
   * Show the delete buttons
   */
   'click .toggle-danger'(event){
      const state = Session.get('dangerModeClass')
      if (state == 'danger-on') {
         Session.set('dangerModeClass', 'danger-off')
      }
      if (state == 'danger-off') {
         Session.set('dangerModeClass', 'danger-on')
      }
   }
});

Template.okrsStaffId.helpers({
   /**
   * Returns the current staff member and
   * filters the OKRS but session state
   */
   staffMember() {
      const year = Session.get('okrYear')
      const quarter = Session.get('okrQuarter')
      const userDoc = Okrs.find().fetch();

      userDoc[0].okrs = _.where(userDoc[0].okrs, { year: year, quarter: quarter })

      return userDoc
   },
   dangerModeClass() {
      return Session.get('dangerModeClass');
   },
   year() {
      return Session.get('okrYear');
   },
   quarter() {
      return Session.get('okrQuarter');
   }
});

Template.okrsStaffId.onCreated(() => {
   Session.set('dangerModeClass', 'danger-off')
   Session.set('okrYear', moment().year())
   Session.set('okrQuarter', moment().quarter())
})
