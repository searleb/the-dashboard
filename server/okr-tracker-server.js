Meteor.startup(function(){
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
            "okrs": [
               {
                  "id": new Mongo.ObjectID()._str,
                  "title": '',
                  "objectives":[
                     {
                        "id": new Mongo.ObjectID()._str,
                        "description": "",
                        "progress": 0,
                     },
                     // {
                     //    "_id": new Mongo.ObjectID()._str,
                     //    "description": "One Two",
                     //    "progress": 80,
                     // }
                  ]
               },
               // {
               //    "_id": new Mongo.ObjectID()._str,
               //    "title": 'Do this other OKR thing',
               //    "objectives":[
               //       {
               //          "_id": new Mongo.ObjectID()._str,
               //          "description": "One Two",
               //          "progress": 10,
               //       },
               //       {
               //          "_id": new Mongo.ObjectID()._str,
               //          "description": "One Two",
               //          "progress": 60,
               //       }
               //    ]
               // },
            ],
         };

         Meteor.call("okrs.starter", starter, function(error, result) {
            if(error){
               console.error("error", error);
            }
         });
      }
   });
});
