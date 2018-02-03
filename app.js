const scrape = require('./lib/URLscraper')
const calendar = require('./calendar')
const cinema = require('./cinema')
const dinner = require('./dinner')

// Check the arguments - if no arguments console.log "error".
let args = process.argv.slice(2)

if (args.length === 0) {
  console.log('ERROR: No ENTRY URL was provided.')
  process.exit(0)
}

async function run () {
  // Scrape the URLs on the argument URL to get access to cinema, etc.
  console.log('Fetching links from the main page... DONE')
  const scrapedLinks = scrape.scrapeURLs(args)
  const [linkSet] = await Promise.all([scrapedLinks])

  // Do work with the URLs (crawl each page for information and do something with it)
  console.log('Fetching calendar days... DONE')
  const day = await calendar.crawlCalendar(linkSet)
  if (day.length > 0) {
    console.log('Finding a movie thats not fully booked... DONE')
    const movies = await cinema.crawlCinema(linkSet, day)
    console.log('Finding an empty table at the favorite restaurant... DONE')
    dinner.crawlDinner(linkSet, day, movies)
  } else {
    console.log('No match was found inbetween the friends in the caldendar!')
  }
}
run()
