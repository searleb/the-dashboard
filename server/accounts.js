Accounts.onCreateUser(function(options, user) {
    user.profile = {};
    _.extend(user.profile, { favourites : [], office : [] }); // OR user.someField = 'initialValue';
    return user;
});
