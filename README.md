# Home Sweet Home

### Set up
- [Install Meteor](https://www.meteor.com/install)
- Pull the repo
- Open the MF 1Password and find `Home Sweet Home - Settings.json`, download and add this file to the root folder.
- cd into the-dashboard and run `Meteor --settings settings.json` - must be port :3000 which is default as goggle auth callback is set to localhost:3000


### Creating a module *(example)*
- Create module folder under `/client/modules/example`
- `example.html`, `example.js` & `_example.scss` live in this folder
- If you need server side code create `example.js` under /server


### SCSS
`client/scss`
Varibles and global styles live here. Please add any varibles here so they available across the entire project.
To add your new `_example.scss` to the project you will need to import it via `client/scss/main.scss`


### TODO
- [ ] WorkflowMax
  - [x] Colour code by hours logged
  - [x] Add support for LDN
  - [x] Add date to day
  - [ ] Update button or mayb poll every few hours
- [ ] Calendar
  - [x] Restyle
  - [x] Indicate/grey out past event
- [ ] Search Drive / Wiki
  - [x] Styles
  - [x] Combine Drive and Wiki search into one module?
- [ ] Tools
  - [x] Default group per user selection
  - [x] Style
- [ ] Favourites
  - [ ] Style
- [ ] Medium Feed
 - [x] Style
 - [x] Limit results list
- [x] Create sign in /loading page
- [ ] Deployment stuff
 - [x] Remove Autopublish and Insecure then fix everything that breaks
 - [x] Maybe set up [settings.json](https://themeteorchef.com/snippets/making-use-of-settings-json/)
