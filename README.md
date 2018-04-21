# About  
This is a web scraper made for an assignment during my second year at the Linnaeus University.
This was made to learn how to program in a async way aswell as learn how to use promises.
The general structure of the application is pretty self-explanatory, it takes a URL (http://vhost3.lnu.se:20080/weekend for this example) and then it scrapes it and sub-links for the information it is looking for. It checks a group of links and scrapes them for information and compares the info and matches it up to find out when three friends are available to see a movie and eat dinner together.

To run the application, simply pull the repo to your local machine, then open a terminal that have node installed and then cd to the directory of the repo and run  
`npm start  http://vhost3.lnu.se:20080/weekend` or  
`node app.js  http://vhost3.lnu.se:20080/weekend` and the application will do its magic!
