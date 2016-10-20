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
      console.log(OkrYears.find().fetch());
      const okrYears = OkrYears.find().fetch()
      return okrYears[0].years;
   },
});

Template.yearlyTabs.events({
   'click a.dropdown-toggle'(e) {
      console.log(e.target.getAttribute('data-year'));
      Session.set('okrYear', e.target.getAttribute('data-year'))
   },
   'click a.dropdown-item'(e) {
      console.log(e.target.getAttribute('data-quarter'));
      Session.set('okrQuarter', e.target.getAttribute('data-quarter'))
   }
})
