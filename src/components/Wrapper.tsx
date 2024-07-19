import React, { FC, ReactNode } from 'react'

interface WrapperProps {
  padding?: boolean
  maxWidth?: number
  mx?: string
  children: ReactNode
}

const Wrapper: FC<WrapperProps> = ({
  padding = false,
  maxWidth = 4,
  mx = 'auto',
  children,
}) => {
  let classes = [`max-width-${maxWidth}`, `mx${!mx ? '0' : '-auto'}`]

  if (padding) {
    classes.push('p2')
    classes.push('sm-px3')
  }

  return <div className={classes.join(' ')}>{children}</div>
}

export default Wrapper
