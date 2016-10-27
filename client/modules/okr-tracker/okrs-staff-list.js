Template.okrsStaffList.onCreated(() =>{
   Meteor.call('okrs.createMe')
})

Template.okrsStaffList.helpers({
   /**
    * Return all users
    */
   staffMembers: function(){
      return Meteor.users.find({}, { sort: { 'profile.name': 1 } } );
   }
});
