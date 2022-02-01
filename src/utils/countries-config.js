// TODO Either put this config in a better location,
// or make it possible to set this through the Options page
// (and then override the defaultProps in the Login and Packages page
// components that use this config.)
const ca = { label: 'Canada', value: 'ca', currencyCode: 'CAD' }
const us = { label: 'United States + Mexico', value: 'us', currencyCode: 'USD' }
const other = {
  label: 'Other Destinations',
  value: 'other',
  currencyCode: 'USD',
}

export default { ca, us, other }
