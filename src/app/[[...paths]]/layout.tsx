import '../../css/index.css'

import { getOptionsPage } from '@nextwp/core'
import Wrapper from '../../components/Wrapper'
import Header from '@/components/Header'
import GlobalColors from '@/components/GlobalColors'

export default async function Layout(props) {
  const { children } = props
  const options = await getOptionsPage({
    slug: 'nextwp',
  })

  let wrapperProps = { padding: true, maxWidth: 5 }

  return (
    <html>
      <body>
        <GlobalColors
          // title={og.title}

          footerItems={options?.wco_socialmedia.map((item) => ({
            href: item?.url,
            label: item?.label,
          }))}
          footerTagline={options?.wco_footer_tagline}
          footerEstYear={options?.wco_established_year}>
          <Wrapper {...wrapperProps}>
            <Header className="mt3" showTitle />
            {children}
          </Wrapper>
        </GlobalColors>
      </body>
    </html>
  )
}
