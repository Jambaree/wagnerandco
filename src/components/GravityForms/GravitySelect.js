import React from 'react'
import PropTypes from 'prop-types'
import Label from './GravityLabel'
import Desc from './GravityDescription'
import _unescape from 'lodash.unescape'

const GravitySelect = props => {
  let multi = props.type === 'multiselect'
  let selected = undefined
  let id = props.id.toString()
  let choicesArray = []
  let choices = []

  if (typeof props.choices !== 'undefined' && props.choices) {
    choicesArray = props.choices
    if (typeof choicesArray === 'string') {
      choicesArray = JSON.parse(choicesArray)
    }

    choicesArray.forEach((choice, index) => {
      if (choice.isSelected === true) {
        selected = choice.value
      }

      choices.push(
        <option
          id={index}
          key={`${props.namespace}_${props.type}_${index}`}
          value={choice.value}
          selected={multi && choice.isSelected ? true : undefined}>
          {_unescape(choice.text)}
        </option>
      )
    })
  }

  return (
    <Label
      text={props.label}
      visibility={props.visibility}
      htmlFor={id}
      isRequired={props.isRequired}
      size={props.size}>
      <Desc {...props}>
        <select
          multiple={multi ? true : undefined}
          required={props.isRequired.toString()}
          name={id}
          className="mb2"
          defaultValue={selected}
          id={id}>
          {choices}
        </select>
      </Desc>
    </Label>
  )
}

GravitySelect.defaultProps = {
  label: '',
  type: 'select',
  isRequired: false,
}

GravitySelect.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
  choices: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
}

export default GravitySelect
