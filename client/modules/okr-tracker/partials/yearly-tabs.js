/**
* Checks if this year has been added to the dates array,
* if not, it'll add the new year and quarters
*/
Template.yearlyTabs.onCreated(() => {
   const thisYear = moment().year()
   Meteor.call('okrYears.getLastYear', (err, lastRecordedYear) => {
      if (thisYear > lastRecordedYear || lastRecordedYear === undefined) {
         Meteor.call('okrYears.addNewYear', thisYear)
      }
   })
})

Template.yearlyTabs.helpers({
   years() {
      const okrYears = OkrYears.find().fetch()
      return okrYears[0].years;
   },
});

Template.yearlyTabs.events({
   'click a.dropdown-item'(e) {
      Session.set('okrYear', parseInt($(e.target).parent().prev('a').attr('data-year')))
      Session.set('okrQuarter', parseInt(e.target.getAttribute('data-quarter')))
   }
})
