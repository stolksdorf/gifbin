# Changelog

### 3.0.0 - Saturday, 09/04/2016
- Finished the new gif form, way more modular now
- Added a close button to the infobox on the searchbar
- Added an error pop out window
- Fixed the css on the bucket select



### 3.0.0dev - Tuesday, 19/01/2016
- Added a What's new page
- Updated to use Vitreum3
- Switched over to using pico-router and pico-flux
- Improved searching, with fav searhcing now!
- Greatly simplified the code for the user page and the gifContainer object
- Large lists of gifs will now incrementally load
- Query params with pre-render on the server now, for zippier searches from the url bar

///TODO


### 2.1.1 - Thrusday, 03/12/2015
* Adding gifs actually broke in the last push, fixing that.

### 2.1.0 - Wednesday, 25/11/2015
* Added in the ability to favourite gifs
* Added in search term exclusion

### 2.0.1 - Wednesday, 07/11/2015
* Specifying specific Node versions for heroku
* Removed ZeroClipboard, using `document.execcommand('copy')` now. So much cleaner
