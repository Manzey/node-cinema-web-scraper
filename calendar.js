const scrape = require('./lib/URLscraper')
const table = require('./lib/TableScraper')

async function crawlCalendar(linkSet) {
    // Initialize variables and set them in the forEach
  let scrapedCalendars
  let calendarLink
  linkSet.forEach(function(link) {
    // If the link is the link for the calendar, scrape the URLs from that page and save the URL in a variable.
     if (link.includes('calendar')) {
      scrapedCalendars = scrape.scrapeURLs([link])
      calendarLink = link
     }
  })
  const [calendarSet] = await Promise.all([scrapedCalendars])
  
  
  let mary, peter, paul
  // Iterate over all the calendars and make seperate objects of the returned 'person'
    for (let link of calendarSet) {
      const scrapedPerson = table.scrapeURL(calendarLink + link)
      const [person] = await Promise.all([scrapedPerson])
      if (person.name.toLowerCase() == 'mary') {
        mary = person
      }
  
      if (person.name.toLowerCase() == 'peter') {
        peter = person
      }
  
      if (person.name.toLowerCase() == 'paul') {
        paul = person
      }   
    }
  
    let friday = false, saturday = false, sunday = false
      if (mary.friday && peter.friday && paul.friday) {
        friday = true
        console.log('FRIDAY IT IS!')
      }
      if (mary.saturday && peter.saturday && paul.saturday) {
        saturday = true
        console.log('SATURDAY IT IS!')
      }
      if (mary.sunday && peter.sunday && paul.sunday) {
        sunday = true
        console.log('SUNDAY IT IS!')
      }
  }

  module.exports.crawlCalendar = crawlCalendar