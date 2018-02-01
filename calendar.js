const scrape = require('./lib/URLscraper')
const table = require('./lib/TableScraper')

async function crawlCalendar (linkSet) {
    // Initialize variables and set them in the forEach
  let scrapedCalendars
  let calendarLink

  for (let link of linkSet) {
        // If the link is the link for the calendar, scrape the URLs from that page and save the URL in a variable.
    if (link.includes('calendar')) {
      scrapedCalendars = scrape.scrapeURLs([link])
      calendarLink = link
    }
  }
  const [calendarSet] = await Promise.all([scrapedCalendars])

  let mary, peter, paul
  // Iterate over all the calendars and make seperate objects of the returned 'person'
  for (let link of calendarSet) {
    const scrapedPerson = table.scrapeURL(calendarLink + link)
    const [person] = await Promise.all([scrapedPerson])
    if (person.name.toLowerCase() === 'mary') {
      mary = person
    }

    if (person.name.toLowerCase() === 'peter') {
      peter = person
    }

    if (person.name.toLowerCase() === 'paul') {
      paul = person
    }
  }
  let days = []
  if (mary.friday && peter.friday && paul.friday) {
    days.push('Friday')
  }
  if (mary.saturday && peter.saturday && paul.saturday) {
    days.push('Saturday')
  }
  if (mary.sunday && peter.sunday && paul.sunday) {
    days.push('Sunday')
  }
  return days
}

module.exports.crawlCalendar = crawlCalendar
