Template.userProfile.helpers({
    userData: function(){
        console.log(Meteor.user());
        return Meteor.user();
    }
});
