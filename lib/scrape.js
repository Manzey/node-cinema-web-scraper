// const cheerio = require('cheerio')
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

async function extractLinks (urls) {
    var promises = []
    var urlSet = new Set()
  
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
  
  module.exports.extractLinks = extractLinks