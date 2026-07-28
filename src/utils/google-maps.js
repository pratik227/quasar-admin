/*
 * On-demand Google Maps JS API loader.
 *
 * The API used to be a plain <script> in /index.html, which meant all 24 routes
 * paid for a ~100 KB render-blocking third-party request while only three pages
 * (Map, MapMarker, StreetView) ever used it.
 *
 * Note: no API key is set, matching the previous behaviour. Google will render a
 * development watermark and log a "NoApiKeys" warning until you add one:
 *   `${API_URL}?loading=async&key=YOUR_KEY`
 */

const API_URL = 'https://maps.googleapis.com/maps/api/js?loading=async'

let pending = null

export function loadGoogleMaps () {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps can only be loaded in the browser'))
  }

  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps)
  }

  if (pending !== null) {
    return pending
  }

  pending = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = API_URL
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.google.maps)
    script.onerror = () => {
      pending = null // allow a later retry
      reject(new Error('Failed to load the Google Maps JS API'))
    }
    document.head.appendChild(script)
  })

  return pending
}
