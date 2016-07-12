Template.okrsUser.onCreated(function(){
   Meteor.subscribe('okrs');
});

Template.okrsUser.events({
   'submit .new-task'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;
      const text = target.text.value;

      // Insert a task into the collection
      Meteor.call("okrs.insert", text, function(error, result){
         if(error){
            console.log("error", error);
         }
         if(result){
            console.log("result", result);
         }
      });

      // Clear form
      target.text.value = '';
   },
});

Template.okrsUser.helpers({
   tests() {
      return Okrs.find({});
   }
});
