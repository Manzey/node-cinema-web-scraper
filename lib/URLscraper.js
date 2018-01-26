const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

async function scrapeURLs (urls) {
    var promises = []
    var urlSet = new Set()
  
    // Add all URL contents to an array.
    for (var i = 0; i < urls.length; i++) {
      promises.push(getText(urls[i]))
    }
  
    const texts = await Promise.all(promises)
    texts.map(function(text) {
      const dom = new JSDOM(text)
      Array.from(dom.window.document.querySelectorAll(`a[href^='http://'], a[href^='https://']`))
        .map(function(element) {
            urlSet.add(element.href)            
            })
    })  
    return urlSet
  }

  // Fetches the URL content
  async function getText(url) {
    const fetched = await fetch(url)
    return fetched.text()
  }
  
  module.exports.scrapeURLs = scrapeURLs