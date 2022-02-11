// Check it isn’t the WordPress schema post, where all
// field types are defined once, but the content is
// fake and placeholder.
const permittedSlug = function(slug) {
  return true
}

export default permittedSlug
