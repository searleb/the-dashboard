/**
 * Checks if this year has been added to the dates array,
 * if not, it'll add the new year and quarters
 */
Template.yearlyTabs.onCreated(() => {
   const thisYear = moment().year()
   Meteor.call('okrDates.getLastYear', (err, lastRecordedYear) => {
      if (thisYear !== lastRecordedYear || lastRecordedYear === undefined) {
         Meteor.call('okrDates.addNewYear', thisYear)
      }
   })
})
