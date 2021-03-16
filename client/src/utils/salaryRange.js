export default function salaryRange({ salaryMin, salaryMax, currency }) {
  return `${salaryMin} - ${salaryMax} ${currency}`
}