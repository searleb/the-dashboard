Template.okrEntryForm.helpers({
   dangerModeClass() {
      return Session.get('dangerModeClass');
   }
});
Template.okrEntryForm.events({
   'change input[type="range"]'(event){
      $(event.target).closest('form').submit();
   }
})
