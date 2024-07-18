import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'
import GlobalNav from './GlobalNav'
import { Monogram } from './Logos'
import unesc from '../utils/unescape'

const today = new Date()

const GlobalFooter = props => {
  // Factor in whether or not the title needs a period when
  // at the end of a sentence
  let title = unesc(props.title)

  return (
    <footer className="py4">
      <Wrapper maxWidth={5} padding>
        <GlobalNav pathname={props.pathname} title={title} color={props.color}>
          <Monogram width="64px" fillName={props.color} />
        </GlobalNav>
        <div className="mt2 mb2">
          <GlobalNav
            color={props.color}
            items={props.items}
            children=""
            title=""
          />
        </div>
        <div className="mt4 sm-mt3 center mx-auto">
          <small
            className="h5 block line-height-4"
            dangerouslySetInnerHTML={{ __html: props.tagline }}
          />
        </div>
      </Wrapper>
    </footer>
  )
}

GlobalFooter.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  year: PropTypes.string.isRequired,
  tagline: PropTypes.string,
}

GlobalFooter.defaultProps = {
  title: 'Wagner & Co.',
  items: [{ href: '/', label: 'Instagram' }, { href: '/', label: 'Facebook' }],
  year: today.getFullYear().toString(),
  tagline: 'Based in Vancouver, British Columbia and Toronto, Ontario.',
}

export default GlobalFooter
