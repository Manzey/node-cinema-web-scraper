const axios = require('axios');

async function checkAvailability(x_url, x_day) {
    let day = 0
    let tempURL = x_url
    let moviePromises = []
    if (x_day.toLowerCase() == 'friday') {
        day = 5
    } else if (x_day.toLowerCase() == 'saturday') {
        day = 6
    } else if (x_day.toLowerCase() == 'sunday') {
        day = 7
    }

    tempURL += '/check?day=0' + day + '&movie=0'
    url = ''
    for (var i = 1; i < 4; i++) {
        url = tempURL + i

    moviePromises.push(axios.get(url)
    .then(function(response) {
        return (response.data)
    })
    .catch(function(error){
        console.log(error)
    }))    
    }
    const movies = await Promise.all(moviePromises)
    return movies
}

async function intercept(x_url, x_day) {
const availability = checkAvailability(x_url, x_day)
const [available] = await Promise.all([availability])
let selectedMovies = []
for (movie of available) {
    //console.log(movie)
    for (times of movie) {
        if (times.status == 1) {
            //console.log('NOT FULL')
            selectedMovies.push(times)
        }
    }

}
    return selectedMovies
}

module.exports.intercept = intercept

