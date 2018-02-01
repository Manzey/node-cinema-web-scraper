const cookie = require('./lib/CookieMonster')

async function crawlDinner (linkSet, day, movies) {
  let dinnerLink
  for (let link of linkSet) {
    if (link.includes('dinner')) {
      dinnerLink = link
    }
  }
  const cookieData = cookie.scrapeURL(dinnerLink, day)
  const [bookingsArray] = await Promise.all([cookieData])

  console.log('Putting recommendations together... DONE\n')
// Added for support if more than one day is a match
  for (let [index, bookings] of bookingsArray.entries()) {
    // Remove extra whitespace and split string for every line - creating an array of the bookings
    let times = bookings.replace(/^\s+|\s+$/, '')
    .replace(/\s+/, ' ').split('\n')

        // Loop backwards and remove all bookings that are not free
    for (let i = times.length - 1; i >= 0; i--) {
      if (!(times[i].toLowerCase().includes('free'))) {
        times.splice(i, 1)
      } else {
        times[i] = times[i].replace(/\s/g, '')
      }
    }
    for (let time of times) {
      let dinnerTime = time.substring(0, 2)
      for (let movie of movies) {
        let movieTime = movie.time.substring(0, 2)
        if (parseInt(movieTime) === (parseInt(dinnerTime) - 2)) {
          let movieName
          if (movie.movie === '01') {
            movieName = 'The Flying Deuces'
          } else if (movie.movie === '02') {
            movieName = 'Keep Your Seats, Please'
          } else if (movie.movie === '03') {
            movieName = 'A Day at the Races'
          }

          console.log('* On ' + day[index] + ' there`s a free table between ' + (dinnerTime) + ':00 and ' + (parseInt(dinnerTime) + 2) + ':00,' +
                     ' after you`ve seen the "' + movieName + '" which starts at ' + (movieTime) + ':00')
        }
      }
    }
  }
}

module.exports.crawlDinner = crawlDinner
