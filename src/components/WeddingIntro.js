'use client'
import React from 'react'

const MultiColumnOffsetHack = ({ large = false }) => {
  return (
    <React.Fragment>
      {large === true ? (
        <span className="select-none xs-hide sm-hide md-hide lg-show">
          <br />
          <br />
          <br />
          <br />
        </span>
      ) : null}

      <span className="select-none xs-hide sm-show md-show lg-show">
        <br />
        <br />
        <br />
        <br />
      </span>
    </React.Fragment>
  )
}

class MultiColumnIntro extends React.Component {
  constructor(props) {
    super(props)

    this.columns = this.wpContentToColumns(props.children)
  }

  wpContentToColumns(content) {
    const { favorColumn } = this.props

    // Split on newline, <p> is omitted using WP theme settings
    let contentSplit = content.split(/\n/)

    let half
    if (favorColumn === 'first') {
      half = Math.ceil(contentSplit.length / 2)
    } else {
      half = Math.floor(contentSplit.length / 2)
    }

    let contentParas = contentSplit.map((para, index) => (
      <p key={`Para_${index}`} dangerouslySetInnerHTML={{ __html: para }} />
    ))

    return [contentParas.slice(0, half), contentParas.slice(half)]
  }

  render() {
    return (
      <div className="col-12 sm-flex sm-mxn1 mb3 md-mb0">
        {this.columns.map((col, index) => {
          return (
            <div
              key={`MultiColumnIntro_col_${index}`}
              className={`col-12 md-col-6 sm-px1 block ${
                index === 1 ? 'self-center' : ''
              }`}>
              {index === 1 ? (
                <MultiColumnOffsetHack large={col.length >= 3 ? true : false} />
              ) : null}
              {col}
            </div>
          )
        })}
      </div>
    )
  }
}

MultiColumnIntro.defaultProps = {
  favorColumn: 'last',
}

export default MultiColumnIntro
