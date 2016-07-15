
Template.okrsStaffList.helpers({
   /**
    * Return all users
    */
   staffMembers: function(){
      return Meteor.users.find({});
   }
});
