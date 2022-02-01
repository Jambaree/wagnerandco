// Check it isn’t the WordPress schema post, where all
// field types are defined once, but the content is
// fake and placeholder.
const permittedSlug = function(slug) {
  if (slug === 'schema' || slug === 'placeholder') {
    if (process && process.env && process.env.NODE_ENV === 'development') {
      console.warn('Permitting ', slug)
      return true
    }

    return false
  }

  return true
}

export default permittedSlug
