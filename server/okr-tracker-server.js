Meteor.startup(function(){
   Meteor.methods({
      'okrs.createMe'() {
         /**
         * Fetch all users
         * @return {Object}
         */
         const users = Meteor.users.find().fetch();

         /**
         * Loop over each user,
         * search the OKR collection for their ID,
         * if the ID does not exsist in OKRS then create a starter entry for that user.
         * @param  {Object} users
         * @param  {Object, Integer} function(user, i) takes user object and index of loop
         * @return {function}  Meteor.call("okrs.starter")
         */
         _.each(users, function(user, i){

            const match = Okrs.find({"_id" : user._id}).fetch();

            if (match.length === 0) {
               console.log(`creating a new ORK entry for ${user.profile.name} with ID: ${user._id}`);

               const starter = {
                  "_id": user._id,
                  "name": user.profile.name,
                  "okrsTotalProgress": 0,
               };

               Meteor.call("okrs.starter", starter, function(error, result) {
                  if(error){
                     console.error("error", error);
                  }
               });
            }
         });
      }
   })
   Meteor.call('okrs.createMe')
});
