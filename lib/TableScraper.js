const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

async function scrapeURL (url) {
  var promises = []
  var person
  promises.push(getText(url))

  const texts = await Promise.all(promises)
  texts.map(function (text) {
    const dom = new JSDOM(text)
    Array.from(dom.window.document.querySelectorAll(`table`))
        .map(function (element) {
          var name = dom.window.document.querySelector('h2').innerHTML
          var tablehead = element.querySelectorAll('th')
          var tablecell = element.querySelectorAll('td')
          var friday, saturday, sunday

            // Iterate over tableheads (If layout is same - th.length == td.length)
          for (var i = 0; i < tablehead.length; i++) {
            if (tablehead[i].innerHTML.toLowerCase() === 'friday') {
              friday = tablecell[i].innerHTML.toLowerCase() === 'ok'
            }
            if (tablehead[i].innerHTML.toLowerCase() === 'saturday') {
              saturday = tablecell[i].innerHTML.toLowerCase() === 'ok'
            }
            if (tablehead[i].innerHTML.toLowerCase() === 'sunday') {
              sunday = tablecell[i].innerHTML.toLowerCase() === 'ok'
            }
          }
          person = {name: name, friday: friday, saturday: saturday, sunday: sunday}
        })
  })
  return person
}

  // Fetches the URL content
async function getText (url) {
  const fetched = await fetch(url)
  return fetched.text()
}

module.exports.scrapeURL = scrapeURL
