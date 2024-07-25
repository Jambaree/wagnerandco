'use client'
import React from 'react'
import PropTypes from 'prop-types'
import Label from './GravityLabel'
import Desc from './GravityDescription'

class GravityRadioGroup extends React.Component {
  constructor() {
    super()
    this.state = {
      used: false,
    }
  }

  render() {
    const props = this.props
    let id = props.id.toString()
    let choicesArray = []

    if (typeof props.choices !== 'undefined' && props.choices) {
      choicesArray = props.choices
      if (typeof choicesArray === 'string') {
        choicesArray = JSON.parse(choicesArray)
      }
    }

    return (
      <fieldset
        className={`mb2 ${this.state.used ? '' : 'input-unused'}`}
        onBlur={(e) => {
          if (!this.state.used) {
            this.setState({ used: true })
          }

          if (props.onBlur && typeof props.onBlur === 'function') {
            return props.onBlur(e)
          }
        }}
        id={id}>
        <Label type="legend" text={props.label} isRequired={props.isRequired}>
          {choicesArray.map((choice, index) => {
            // Formatted for Gravity Forms
            let selectName = `${id}.${index + 1}`

            return (
              <Label
                key={`${props.namespace}_${props.type}_${index}`}
                visibility={props.visibility}>
                <Desc {...props}>
                  <input
                    type={props.type}
                    name={props.type === 'checkbox' ? selectName : id}
                    value={choice.value}
                    defaultChecked={choice.isSelected || false}
                    required={props.isRequired ? true : undefined}
                  />
                  &nbsp;
                  <span>{choice.text}</span>
                </Desc>
              </Label>
            )
          })}
        </Label>
      </fieldset>
    )
  }
}

GravityRadioGroup.defaultProps = {
  label: '',
  type: 'radio',
  isRequired: false,
}

GravityRadioGroup.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
  choices: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
}

export default GravityRadioGroup
