const traffic = require('./lib/trafficInterceptor')

async function crawlCinema(linkSet, day) {
let cinemaLink
for (link of linkSet) {
  if (link.includes('cinema')) {
    cinemaLink = link
   }
}

const trafficData = traffic.intercept(cinemaLink, day)
const [movies] = await Promise.all([trafficData])
return movies
}

module.exports.crawlCinema = crawlCinema