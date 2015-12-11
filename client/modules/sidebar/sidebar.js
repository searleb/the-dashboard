Template.sidebar.onRendered(function (argument) {
    $(function () {
      $('.iconav [data-toggle="tooltip"]').tooltip();
  });
});

Template.sidebar.helpers({
    userData: function(){
        return Meteor.user();
    }
});
