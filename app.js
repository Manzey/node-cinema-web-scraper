const scrape = require('./lib/URLscraper')
const table = require('./lib/TableScraper')
const traffic = require('./lib/trafficInterceptor')
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
async function run() {
const scrapedLinks = scrape.scrapeURLs(args)
const [linkSet] = await Promise.all([scrapedLinks])

const day = await calendar.crawlCalendar(linkSet)
const movies = await cinema.crawlCinema(linkSet, day)
dinner.crawlDinner(linkSet, day, movies)
}
run()

