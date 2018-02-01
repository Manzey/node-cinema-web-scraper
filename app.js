const scrape = require('./lib/URLscraper')
const calendar = require('./calendar')
const cinema = require('./cinema')
const dinner = require('./dinner')

// Check the arguments.
let args = process.argv.slice(2)

if (args.length === 0) {
  console.log('ERROR: No ENTRY URL was provided.')
  process.exit(0)
}

// Scrape the URLs on the argument URL to get access to cinema, etc.
async function run () {
  console.log('Fetching links from the main page... DONE')
  const scrapedLinks = scrape.scrapeURLs(args)
  const [linkSet] = await Promise.all([scrapedLinks])

  console.log('Fetching calendar days... DONE')
  const day = await calendar.crawlCalendar(linkSet)
  console.log('Finding a movie thats not fully booked... DONE')
  const movies = await cinema.crawlCinema(linkSet, day)
  console.log('Finding an empty table at the favorite restaurant... DONE')
  dinner.crawlDinner(linkSet, day, movies)
}
run()
