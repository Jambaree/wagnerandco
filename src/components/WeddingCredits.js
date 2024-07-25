import React from 'react'
import PropTypes from 'prop-types'

const WeddingCredit = (props) => (
  <li className="block mb2">
    <strong className="uppercase font-weight-600 track-1 block">
      {props.label}
    </strong>
    {props.href ? (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    ) : (
      <span>{props.children}</span>
    )}
  </li>
)

WeddingCredit.defaultProps = {
  children: null,
  label: null,
  href: null,
}

WeddingCredit.propTypes = {
  children: PropTypes.any.isRequired,
  label: PropTypes.string,
  href: PropTypes.string,
}

const WeddingCredits = (props) => {
  return (
    <ul className="m0 p0 list-style-none">
      {props.items
        ? props.items.map((obj, index) => {
            let label = obj.label === 'Other' ? obj.label_custom : obj.label

            return (
              <WeddingCredit
                key={`Wedding_Credit_${index}`}
                href={obj.link}
                label={label}>
                {obj.credit}
              </WeddingCredit>
            )
          })
        : null}
    </ul>
  )
}

WeddingCredits.defaultProps = {}

WeddingCredits.propTypes = {
  items: PropTypes.array,
}

export default WeddingCredits
