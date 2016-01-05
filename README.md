# Home Sweet Home

### Set up
- [Install Meteor](https://www.meteor.com/install)
- Pull the repo
- cd to root and run `Meteor` - must be port :3000 which is default as goggle auth callback is set to localhost:3000



### Creating a module *(example)*
- Create module folder under /client/modules*/example*
- *example*.HTML, *example*.JS & _*example*.SCSS live in this folder
- If you need server side code create *example*.js under /server
- Do something awesome

### SCSS
*client/scss*
Varibles and global styles live here. Please add any varibles here so they available across the entire project.
To add your new _*example*.SCSS to the project you will need to import it via client/scss/main.scss

### TODO
- [ ] WorkflowMax
  - [x] Colour code by hours logged
  - [x] Add support for LDN
  - [ ] Add date to day
  - [ ] Update button or mayb poll every few hours
- [] Calendar
  - [x] Restyle
  - [x] Indicate/grey out past event
- [ ] Search Drive / Wiki
  - [ ] Styles
  - [x] Combine Drive and Wiki search into one module?
- [ ] Tools
  - [x] Default group per user selection
  - [x] Style
- [ ] Favourites
  - [ ] Style
- [ ] Medium Feed
 - [x] Style
 - [x] Limit results list
- [ ] Create sign in /loading page
- [ ] Deployment stuff
 - [ ] Remove Autopublish and Insecure then fix everything that breaks
 - [ ] Maybe set up [settings.json](https://themeteorchef.com/snippets/making-use-of-settings-json/)
