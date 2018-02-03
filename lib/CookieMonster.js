const cheerio = require('cheerio')
const request = require('request-promise').defaults({ simple: false })
const tough = require('tough-cookie')

async function scrapeURL (url, dayArray) {
  var promises = []
  var booking = []
  promises.push(getText(url))

  // Using cheerio for this one to avoid having to deal with the CSS-parsing errors of JSDOM.
  const texts = await Promise.all(promises)
  texts.map(function (text) {
    const $ = cheerio.load(text)
    for (let i = 0; i < 7; i++) {
      let div = $('div.WordSection' + i)

      // If div includes the day, the next div contains the bookings.
      for (let day of dayArray) {
        if (div.text().toLowerCase().includes(day.toLowerCase())) {
          booking.push($('div.WordSection' + (i + 1)).text())
        }
      }
    }
  })

  return booking
}

  // Fetches the URL content
async function getText (url) {
  var options = {
    url: url + '/login/',
    followRedirect: true,
    form: {
      username: 'zeke',
      password: 'coys',
      submit: 'login'
    }
  }
  // Create a cookie jar and set it as default for req and use that to POST and GET.
  var j = request.jar()
  var req = request.defaults({jar: j})
  await req.post(options, function (error, httpResponse, body) {
    if (error) {
      console.log(error)
    }

    // Probably one of the ugliest solutions I've ever done but it was the only way I could do it without achieving complete and disgusting callback-hell
    let idIndex = httpResponse.headers['set-cookie'][0].indexOf('=')
    let endIndex = httpResponse.headers['set-cookie'][0].indexOf(';')
    let token = httpResponse.headers['set-cookie'][0].substring(idIndex, endIndex)
    let cookie = new tough.Cookie({
      sessionid: token
    })
    j.setCookie(cookie, url + '/login/booking')
  })
  var options2 = {
    url: url + '/login/booking'
  }
  let body
  await req.get(options2, function (err, res, b) {
    if (err) {
      console.log(err)
    }
    body = b
  })
  return body
}

module.exports.scrapeURL = scrapeURL
