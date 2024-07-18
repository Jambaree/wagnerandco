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

  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href={`https://use.typekit.net/${options.wco_service_typekit}.css`}
        />
      </head>
      <body>
        <GlobalColors
          // title={og.title}

          footerItems={options?.wco_socialmedia.map((item) => ({
            href: item?.url,
            label: item?.label,
          }))}
          footerTagline={options?.wco_footer_tagline}
          footerEstYear={options?.wco_established_year}>
          {children}
        </GlobalColors>
      </body>
    </html>
  )
}
