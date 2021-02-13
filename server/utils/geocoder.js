const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'mapquest',
  apiKey: 'i3Dusa6p7SuAq7T7zpQmkvfRHGCp9FpH',
}

const geocodedData = async ({ address, country, city }) => {
  try {
    const geocoder = NodeGeocoder(options)
    const res = await geocoder.geocode({
      address,
      country,
      city,
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

module.exports = geocodedData
