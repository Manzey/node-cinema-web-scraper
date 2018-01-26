const scrape = require('./lib/URLscraper')

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

linkSet.forEach(function(link) {
   console.log(link)
})
}
run()