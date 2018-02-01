const axios = require('axios')

async function checkAvailability (xUrl, dayArray) {
  let day = 0
  let tempURL = xUrl
  let moviePromises = []
  for (let xDay of dayArray) {
    if (xDay.toLowerCase() === 'friday') {
      day = 5
    } else if (xDay.toLowerCase() === 'saturday') {
      day = 6
    } else if (xDay.toLowerCase() === 'sunday') {
      day = 7
    }
  }
  tempURL += '/check?day=0' + day + '&movie=0'
  let url = ''
  for (var i = 1; i < 4; i++) {
    url = tempURL + i

    moviePromises.push(axios.get(url)
    .then(function (response) {
      return (response.data)
    })
    .catch(function (error) {
      console.log(error)
    }))
  }
  const movies = await Promise.all(moviePromises)
  return movies
}

async function intercept (xUrl, xDay) {
  const availability = checkAvailability(xUrl, xDay)
  const [available] = await Promise.all([availability])
  let selectedMovies = []
  for (let movie of available) {
    for (let times of movie) {
      if (times.status === 1) {
        selectedMovies.push(times)
      }
    }
  }
  return selectedMovies
}

module.exports.intercept = intercept
