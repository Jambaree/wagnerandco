import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

class GravityFormIFrame extends Component {
  constructor() {
    super()
    this.state = {}

    this.el = null
  }

  render() {
    const props = this.props

    if (!props.formId) {
      return null
    }

    let formId = props.formId.toString()
    // formId = '2'

    return (
      <Fragment>
        <Helmet>
          <script
            src={`${process.env.GATSBY_WP_URL}/wp-content/plugins/gravity-forms-iframe-develop/assets/scripts/gfembed.min.js`}
            type="text/javascript"></script>
        </Helmet>
        <iframe
          title={`Form ${formId}`}
          ref={el => {
            this.el = el
          }}
          src={`${process.env.GATSBY_WP_URL}/gfembed/?f=${formId}`}
          width="100%"
          height="750"
          frameBorder="0"
          className="gfiframe mxn2"
        />
      </Fragment>
    )
  }
}

GravityFormIFrame.defaultProps = {
  formId: 1,
}

GravityFormIFrame.defaultProps = {
  formId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default GravityFormIFrame
