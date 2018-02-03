const axios = require('axios')

async function checkAvailability (xUrl, dayArray) {
  let day = 0
  let tempURL = xUrl
  let moviePromises = []
  // Iterate over the days and set the value of the day variable when found.
  for (let xDay of dayArray) {
    if (xDay.toLowerCase() === 'friday') {
      day = 5
    } else if (xDay.toLowerCase() === 'saturday') {
      day = 6
    } else if (xDay.toLowerCase() === 'sunday') {
      day = 7
    }
  }
  // Create the URL based on what the selected day is.
  tempURL += '/check?day=0' + day + '&movie=0'
  let url = ''
  for (var i = 1; i < 4; i++) {
    url = tempURL + i

    moviePromises.push(getText(url))
  }
  const movies = await Promise.all(moviePromises)
  return movies
}

async function intercept (xUrl, xDay) {
  const availability = checkAvailability(xUrl, xDay)
  const [available] = await Promise.all([availability])
  let selectedMovies = []
  // Iterate over movies and then each time it is shown and check if it is fully booked or not.
  for (let movie of available) {
    for (let times of movie) {
      if (times.status === 1) {
        selectedMovies.push(times)
      }
    }
  }
  return selectedMovies
}

async function getText (url) {
  const response = await axios.get(url)
    .then(function (response) {
      return (response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  return response
}

module.exports.intercept = intercept
