const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const fetchCookie = require('fetch-cookie')
const axios = require('axios')

async function scrapeURL (url) {
    var promises = []
    var person
      promises.push(getText(url))
    
  
    const texts = await Promise.all(promises)
    texts.map(function(text) {
      const dom = new JSDOM(text)
      Array.from(dom.window.document.querySelectorAll(`body`))
        .map(function(element) {         
               //console.log(element.innerHTML)
            })
    })  
    return person
  }

  // Fetches the URL content
  async function getText(url) {
        let setCookie
    await axios.get('http://vhost3.lnu.se:20080/dinner/login/')
        .then(function(response) {
            let cookieIndex = response.headers["set-cookie"][0].indexOf(";")
            setCookie = response.headers["set-cookie"][0].substring(0, cookieIndex)
            
        })
        .catch(function(error){
            //console.log(error)
        })
        //console.log(setCookie)
    axios.get('http://vhost3.lnu.se:20080/dinner/login/booking', {
            withCredentials: true,
            headers: {
                Cookie: setCookie                       
            }})
            .then(function(response) {
                //let cookieIndex = response.headers["set-cookie"][0].indexOf(";")
                //let cookie2 = response.headers["set-cookie"][0].substring(0, cookieIndex+1)
                console.log(response)
                //console.log(setCookie)
                //console.log (cookie.substring(0, cookieIndex))
            })
            .catch(function(error){
                console.log(error)
                //console.log(setCookie)
            })
        

        
  }
  
  scrapeURL()

  module.exports.scrapeURL = scrapeURL