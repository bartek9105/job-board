const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'mapquest',
  apiKey: process.env.MAPQUEST_KEY,
}

const geocodedData = async ({ address, country, city }) => {
  try {
    const geocoder = NodeGeocoder(options)
    const res = await geocoder.geocode({
      address,
      country,
      city,
    })
    return res[0]
  } catch (error) {
    console.log(error)
  }
}

module.exports = geocodedData
