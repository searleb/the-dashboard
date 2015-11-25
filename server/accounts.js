Accounts.onCreateUser(function(options, user) {
    user.profile = {};
    _.extend(user.profile, { favourites : [] }); // OR user.someField = 'initialValue';
    return user;
});
