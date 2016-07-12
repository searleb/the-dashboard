Meteor.startup(function(){
   const users = Meteor.users.find().fetch();

   _.each(users, function(user, i){

      var match = Okrs.find({"_id" : user._id}).fetch();
      console.log(match);

      if (match.length > 0) {
         console.log(`${user._id} OKR entry already exsists`);
      } else {
         console.log(`creating a new ORK entry for ${user._id} ${user.profile.name}` );
         const starter = {
            "_id": user._id,
            "name": user.profile.name,
            "okrs": [],
         };
         Meteor.call("okrs.starter", starter, function(error, result){
            if(error){
               console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
         });
      }
   });
});
