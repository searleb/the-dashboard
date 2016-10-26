# Home Sweet Home

## Installation
- [Install Meteor](https://www.meteor.com/install)
- Pull the repo
- Open the MF 1Password and find `Home Sweet Home - Settings.json`, download and add this file to the root folder.
- cd to root and run `meteor --settings settings.json` - must be port :3000 which is default as goggle auth callback is set to localhost:3000

### Creating a module *(example)*
- Create module folder under `/client/modules/example`
- `example.html`, `example.js` & `_example.scss` live in this folder
- If you need server side code create `example.js` under /server

### SCSS
`client/scss`
Varibles and global styles live here. Please add any varibles here so they available across the entire project.
To add your new `_example.scss` to the project you will need to import it via `client/scss/main.scss`
