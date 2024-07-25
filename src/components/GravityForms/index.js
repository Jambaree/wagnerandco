'use client'
import React from 'react'
import PropTypes from 'prop-types'
// import Button from './Button'

import GravityButton from './GravityButton'
import GravityProduct from './GravityProduct'
import GravityRadioGroup from './GravityRadioGroup'
import GravityTextInput from './GravityTextInput'
import GravityTextArea from './GravityTextArea'
import GravitySelect from './GravitySelect'
import GravityPhoneInput from './GravityPhoneInput'
import GravityDateInput from './GravityDateInput'

import slugify from 'slugify'

// TODO Shouldn’t presume to use this specific
// polyfill if GravityForm becomes a library
import 'whatwg-fetch'
import formToJSON from '../../vendor/formToJSON'

const GravitySection = (props) => (
  <div className="mt4 mb3 sm-px2" id={slugify(props?.label)}>
    <h2 className="h2 line-height-2 mb0">{props.label}</h2>
    <p className="h4 mt1">{props.description}</p>
    <hr />
  </div>
)

const GravityHTML = (props) => {
  return (
    <div
      className="sm-px2"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  )
}

const GravityHiddenInput = (props) => {
  // console.log(props)
  // devalutValue = {embed_post:post_title}
  // There are many other values Gravity Forms
  // supports passing along.
  let defaultValue = props.defaultValue
  if (defaultValue === '{embed_post:post_title}') {
    if (typeof document !== 'undefined') {
      defaultValue = document.title
    }
  }

  return (
    <GravityTextInput
      label={false}
      visibility="hidden"
      {...props}
      defaultValue={defaultValue}
    />
  )
}

const InputTypes = {
  // Standard Fields
  text: GravityTextInput,
  textarea: GravityTextArea,
  select: GravitySelect,
  multiselect: GravitySelect,
  number: GravityTextInput,
  checkbox: GravityRadioGroup,
  radio: GravityRadioGroup,
  hidden: GravityHiddenInput, // Basic support
  html: GravityHTML,
  section: GravitySection,
  // page

  // Advanced Fields
  // name
  date: GravityDateInput, // Basic support
  // time
  phone: GravityPhoneInput,
  // address
  // website
  email: GravityTextInput,
  // file upload
  // captcha
  // list

  // Post Fields
  // title
  // body
  // excerpt
  // tags
  // cateogry
  // post image
  // custom field

  // Pricing Fields
  product: GravityProduct, // Not supported notification
  // quantity
  // option
  // shipping
  // total
}

const Debug = (props) => {
  return (
    <details>
      <summary>JSON output</summary>
      <pre className="bg-blue white p2">
        <code>{JSON.stringify(props.data, 0, 2)}</code>
      </pre>
    </details>
  )
}

class GravityForm extends React.Component {
  constructor() {
    super()

    this.state = {
      draftId: 0,
      status: null,
    }
  }

  handleReset(el) {
    if (el && typeof window !== 'undefined') {
      el.reset()
    }
  }

  // Maybe only do this once in constructor
  handleFieldConditionalLogic(conditionalLogic) {
    if (typeof document === 'undefined') {
      return // Ensure this runs only on the client side
    }
    if (
      conditionalLogic &&
      conditionalLogic.rules &&
      Array.isArray(conditionalLogic.rules) &&
      conditionalLogic.rules.length >= 1
    ) {
      let actionType = conditionalLogic.actionType
      let show = actionType === 'show'

      conditionalLogic.rules.forEach((ruleObj, index) => {
        // Get the field ID we need
        this.props.data.fields.some((field) => {
          if (field.id.toString() === ruleObj.fieldId.toString()) {
            let fieldEls = document.querySelectorAll(`[name="${field.id}"]`)
            for (let fieldEl of fieldEls) {
              if (ruleObj.operator === 'is') {
                if (fieldEl.value === ruleObj.value) {
                  if (
                    (fieldEl.type === 'radio' || fieldEl.type === 'checkbox') &&
                    !fieldEl.selected
                  ) {
                    return !show
                  }

                  return show
                }
              }
            }

            return
          }
        })
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({ status: 'submitting' })

    // https://github.com/gravityforms/gravityformsrestapi#post-formsform_identries
    let formId = this.props.formId
    let useEntriesEndpoint = this.props.useEntriesEndpoint === true

    // /wp-json/gf/v2/forms/1/submissions
    let endpoint = useEntriesEndpoint === true ? 'entries' : 'submissions'
    let api = `${this.props.url}/wp-json/gf/v2/forms/`
    let url = `${api}${formId}/${endpoint}`

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    // headers.append('Authorization', `Basic ${process.env.NEXT_PUBLIC_GF}`)

    let formData = formToJSON(this.form.elements)
    let formattedFormData = {}

    if (useEntriesEndpoint) {
      // Format for /entries endpoint
      formattedFormData = formData
    } else {
      // Format for /submissions endpoint
      // https://git.io/vhCKE
      Object.keys(formData).forEach((key) => {
        formattedFormData[`input_${key}`] = formData[key]
      })
    }

    // console.log(url)

    let body = JSON.stringify(formattedFormData)

    // console.log(body)

    // Fake timeout for demo
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    }).then(
      (result) => {
        // console.log(result)
        if (result.ok) {
          this.setState({
            status: 'submitted',
            draftId: this.state.draftId + 1,
          })

          this.handleReset(this.form)
        }
      },
      (err) => {
        // TODO Doesn’t seem to work properly?
        console.warn(err)
        this.setState({ status: 'error' })
      }
    )
  }

  render() {
    const state = this.state
    const props = this.props
    const data = props.data
    // TODO Might need to make this configurable, it’s possible
    // only Gatsby changes this to formFields and not just fields
    if (!data) {
      return null
    }

    const fields = data.fields

    let confirmationMarkup = (
      <div className="h3 line-height-3 col-12">
        <div
          dangerouslySetInnerHTML={{
            __html: props.confirmationMessage
              .replace('\r', '<br/>')
              .replace('\n', '<br/>'),
          }}
        />
      </div>
    )

    return (
      <form
        id={`form-${props.formId}`}
        className={data.cssClass || props.defaultClassName}
        onSubmit={this.handleSubmit.bind(this)}
        ref={(el) => {
          this.form = el
        }}>
        {props.showTitle ? (
          <header className="sm-px2">
            <h1 className="mt0 h1 bold line-height-2">{data.title}</h1>
          </header>
        ) : null}

        {props.debug ? Debug : null}

        {fields && fields.length >= 1
          ? fields.map((field, index) => {
              // field.size
              // fields.input
              let result = null
              let conditionalLogicResult = true

              if (
                field.conditionalLogic &&
                typeof field.conditionalLogic !== 'undefined' &&
                field.conditionalLogic !== '""'
              ) {
                conditionalLogicResult = this.handleFieldConditionalLogic(
                  field.conditionalLogic
                )
              }

              // If there is conditional logic, can’t simply check this field
              // for conditionalLogic, because fields change other fields.
              field.onBlur = (e) => {
                if (props.debug) {
                  console.log('Handle conditional logic')
                }
              }

              field.descriptionPlacement =
                field.descriptionPlacement === ''
                  ? data.descriptionPlacement
                  : field.descriptionPlacement

              // TODO Too specific. Turn a text input with a phone mask
              // into the GravityPhoneInput component. The mask is the default
              // from the server.
              if (
                field.type === 'text' &&
                field.inputMask &&
                field.inputMaskValue === '(999) 999-9999'
              ) {
                field.type = 'phone'
              }

              if (InputTypes[field.type]) {
                result = React.createElement(InputTypes[field.type], field, {})
              } else if (field.inputs) {
                result = (
                  <React.Fragment>
                    <h2>{field.label}</h2>
                    {field.inputs.map((nestedField) => {
                      return (
                        <div
                          id={nestedField.id}
                          key={`${props.namespace}_${nestedField.id}`}>
                          <label>
                            <strong>{nestedField.label}</strong>
                            {nestedField.name}
                          </label>
                        </div>
                      )
                    })}
                  </React.Fragment>
                )
              } else {
                if (
                  process &&
                  process.env &&
                  process.env.NODE_ENV === 'development'
                ) {
                  result = (
                    <div className="black muted border rounded p2 m2">
                      {field.type} fields are not supported yet.
                    </div>
                  )
                }
              }

              return (
                <div
                  // style={{
                  //   opacity: conditionalLogicResult ? 1 : 0.25,
                  // }}
                  key={`${props.namespace}_${field.id}_${index}`}>
                  {result}
                </div>
              )
            })
          : null}

        <div className="block mt3 flex items-center sm-px2">
          {state.status === 'submitted' ? (
            confirmationMarkup
          ) : data.button ? (
            <GravityButton
              type={data.button.type}
              disabled={state.status === 'submitting' ? true : undefined}
              loading={state.status === 'submitting' ? true : undefined}>
              {state.status === 'submitting' ? 'Submitting…' : data.button.text}
            </GravityButton>
          ) : null}
        </div>
      </form>
    )
  }
}

GravityForm.defaultProps = {
  namespace: 'GravityForm',
  defaultClassName: 'mb3 sm-mxn2',
  url: 'http://localhost:8080',
  showTitle: false,
  formId: 1,
  // /submissions is the default, this toggles to the /entries
  // endpoint, ex. for programatically submitting entries
  // in bulk and bypassing validation.
  useEntriesEndpoint: false,
  confirmationMessage: 'Thanks for your message!',
  debug: false,
}

GravityForm.propTypes = {
  data: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  formId: PropTypes.number.isRequired,
  showTitle: PropTypes.bool,
  confirmationMessage: PropTypes.string.isRequired,
  debug: PropTypes.bool,
}

export default GravityForm
