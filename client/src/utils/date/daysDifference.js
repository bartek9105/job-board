export default function daysDifference(currentDate, pastDate) {
  const oneDay = 24 * 60 * 60 * 1000
  const firstDate = new Date(currentDate)
  const secondDate = new Date(pastDate)
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
  return `${diffDays}d ago`
}
