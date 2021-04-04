const { Storage } = require('@google-cloud/storage')

const googleFileUpload = async (file) => {
  const storage = new Storage({
    keyFilename: './config/google-credentials.json',
  })
  try {
    const bucket = await storage.bucket(process.env.GCS_BUCKET)
    const fileName = `${file.upload.uuid}-${file.upload.filename}`
    const blob = bucket.file(fileName)
    const stream = blob.createWriteStream()

    stream.on('error', (err) => {
      throw new Error(err)
    })

    const imgUrl = file.dataURL.split(',')[1]
    const imgBuffer = Buffer.from(imgUrl, 'base64')
    stream.end(imgBuffer)

    const fileUrl = `https://storage.cloud.google.com/${process.env.GCS_BUCKET}/${fileName}`

    return fileUrl
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = googleFileUpload
