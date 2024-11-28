import React from 'react'
import Wrapper from './Wrapper'
import GlobalNav from './GlobalNav'
import { Monogram } from './Logos'
import unesc from '../utils/unescape'

const today = new Date()

type GlobalFooterProps = {
  title?: string
  items?: { href: string; label: string }[]
  year: string
  tagline?: string
  color?: string
  pathname?: string
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({
  title = 'Wagner & Co.',
  items = [],
  year = today.getFullYear().toString(),
  tagline = 'Based in Vancouver, British Columbia and Toronto, Ontario.',
  color,
  pathname,
}) => {
  // Factor in whether or not the title needs a period when
  // at the end of a sentence
  let unescapedTitle = unesc(title)

  return (
    <footer className="py4">
      <Wrapper maxWidth={5} padding>
        <GlobalNav pathname={pathname} title={unescapedTitle} color={color}>
          <Monogram width="64px" fillName={color} />
        </GlobalNav>

        <div className="mt4 sm-mt3 center mx-auto">
          <small
            className="h5 block line-height-4"
            dangerouslySetInnerHTML={{ __html: tagline }}
          />
        </div>
      </Wrapper>
    </footer>
  )
}

export default GlobalFooter
