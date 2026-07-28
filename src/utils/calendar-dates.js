/*
 * Small date helpers for the calendar demo page.
 *
 * @quasar/quasar-ui-qcalendar v4 re-exported its internal Timestamp utilities
 * (today/parseDate/parseTimestamp/addToDate). As of v5 those are private, so the
 * few helpers this app actually used are implemented here instead.
 *
 * A "timestamp" is the minimal shape QCalendar works with: an object carrying a
 * 'YYYY-MM-DD' date string plus its numeric parts. All arithmetic is local-time.
 */

function pad (value) {
  return value < 10 ? `0${value}` : `${value}`
}

/** Build a timestamp from a JS Date. */
export function parseDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return {
    date: `${year}-${pad(month)}-${pad(day)}`,
    year,
    month,
    day
  }
}

/** Build a timestamp from a 'YYYY-MM-DD' string. */
export function parseTimestamp (dateString) {
  const [ year, month, day ] = dateString.split('-').map(Number)

  return { date: dateString, year, month, day }
}

/** Today as a 'YYYY-MM-DD' string. */
export function today () {
  return parseDate(new Date()).date
}

/** Return a new timestamp offset by the given number of days. */
export function addToDate (timestamp, { day = 0 } = {}) {
  return parseDate(
    new Date(timestamp.year, timestamp.month - 1, timestamp.day + day)
  )
}
