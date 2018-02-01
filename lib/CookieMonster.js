const { JSDOM } = require('jsdom')
const cheerio = require('cheerio')
const fetch = require('fetch-cookie/node-fetch')(require('node-fetch'))
const axios = require('axios')
const request = require('request-promise').defaults({ simple: false });
const FormData = require('form-data');
const superagent = require('superagent');
var tough = require('tough-cookie');



async function scrapeURL (url, day) {
    var promises = []
    var booking
      promises.push(getText(url))

    
  
    const texts = await Promise.all(promises)
    //console.log(texts)
    texts.map(function(text) {
      const $ = cheerio.load(text)
      for (let i = 0; i < 7; i++) {
        let div = $('div.WordSection' + i)
        
        // If div includes the day, the next div contains the bookings.
        if (div.text().toLowerCase().includes(day.toLowerCase())) {
            booking = $('div.WordSection' + (i+1)).text()
        }
      }
    })
      
    return booking
  }

  // Fetches the URL content
  async function getText(url) {
    var form = {
        username: 'zeke',
        password: 'coys',
        submit: 'login'
      }
      var options = {
        url: url + '/login/',
        followRedirect: true,
        form: {
          username: 'zeke',
          password: 'coys',
          submit: 'login'
        }
      };
      //let cookie

      var j = request.jar();
      var req = request.defaults({jar: j})
        await req.post(options, function(error, httpResponse, body){
            if (error) {
                console.log(error)
            }

            // Probably one of the ugliest solutions I've ever done but it was the only way I could do it without achieving complete and disgusting callback-hell
            let idIndex = httpResponse.headers['set-cookie'][0].indexOf("=")
            let endIndex = httpResponse.headers['set-cookie'][0].indexOf(";")
            let tempId = httpResponse.headers['set-cookie'][0].substring(0, idIndex)
            let tempEnd = httpResponse.headers['set-cookie'][0].substring(idIndex, endIndex)
            let cookie = new tough.Cookie({
                tempId: tempEnd
            })
            j.setCookie(cookie, url + '/login/booking');
        });
      var options2 = {
        url: url + '/login/booking'
      };
      let body 
    await req.get(options2, function(err, res, b) {
        body = b
      });
      return body
  }

module.exports.scrapeURL = scrapeURL