import _unescape from 'lodash.unescape'

// WordPress encodes entities in the REST API to avoid possible XSS issues.
// This only unescapes the Lodash defaults, and the WordPress-style ampersand.
const unesc = function(str) {
  if (str && typeof str === 'string') {
    str = str.replace('&#038;', '&amp;')
    str = str.replace('&bull;', '•')
    str = _unescape(str)
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log('bad str', str)
    }
  }
  return str
}

export default unesc
