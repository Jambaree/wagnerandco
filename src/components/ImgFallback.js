import React from 'react'
import { Monogram } from './Logos'

const ImgFallback = props => {
  return (
    <div className="col-12 px3 py4 bg-white flex items-center justify-around">
      <Monogram fillName="peach" />
    </div>
  )
}

export default ImgFallback
