import { clearConfigCache } from 'prettier'
import React from 'react'
import styled from '@emotion/styled'

import BlockTextarea from './BlockTextarea'
import BlockGifVideo from './VideoLoop'

const components = {
  BlockTextarea,
  BlockGifVideo,
}

const FlexibleContent = (props) => {
  const { rows, data } = props

  if (!!rows) {
    return rows
      .filter((o) => !!o)
      .map(({ fieldGroupName, ...rowData }, index) => {
        if (!fieldGroupName) {
          return null
        }

        const type = fieldGroupName.split('_').slice(-1)[0]

        const Component = components[type]

        // {
        //   console.log(type, Component)
        // }

        return (
          Component && (
            <Container key={index}>
              <Component {...rowData} {...data} />
            </Container>
          )
        )
      })
  }
}

export default FlexibleContent

const Container = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`
