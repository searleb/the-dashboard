# Home Sweet Home

## Installation
- [Install Meteor](https://www.meteor.com/install)
- Pull the repo
- Download settings.json from MF OnePassword to the project root - ***do not commit this file***
- `cd` to root and run `meteor --settings settings.json` - must be port :3000 which is default as goggle auth callback is set to localhost:3000

## Creating a module *(example)*
- Create module folder under /client/modules*/example*
- *example*.HTML, *example*.JS & _*example*.SCSS live in this folder
- If you need server side code create *example*.js under /server
- Do something awesome

### SCSS
*client/scss*
Varibles and global styles live here. Please add any varibles here so they available across the entire project.
To add your new _*example*.SCSS to the project you will need to import it via client/scss/main.scss
