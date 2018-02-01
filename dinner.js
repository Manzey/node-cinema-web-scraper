const cookie = require('./lib/CookieMonster')
async function crawlDinner(linkSet, day, movies) {
    let dinnerLink
    for (link of linkSet) {
        if (link.includes('dinner')) {
            dinnerLink = link
        }
    }
console.log(dinnerLink)
const cookieData = cookie.scrapeURL(dinnerLink, day)
const [bookings] = await Promise.all([cookieData])

// Remove extra whitespace and split string for every line - creating an array of the bookings
let times = bookings.replace(/(^[ \t]*\n)/gm, "").split('\n');

    // Loop backwards and remove all bookings that are not free
    for (let i = times.length - 1; i >= 0; i--) {
        if (!(times[i].toLowerCase().includes('free'))) {
            times.splice(i, 1)
        }
    }
    for (time of times) {
        let dinnerTime = time.substring(0, 2)    
        for (movie of movies) {
            let movieTime = movie.time.substring(0, 2)  
            if ((movieTime - 2) == dinnerTime) {
                console.log(movieTime)
            }
        }
    }
    console.log(movies)
    console.log(times)
}


module.exports.crawlDinner = crawlDinner