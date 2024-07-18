import type { Templates } from '@nextwp/core'
import { DefaultPageTemplate } from './page/default'

// import {DefaultHomeTemplate} from "./page/homeTemplate";

import { WeddingPageTemplate } from './archive/weddings'
import { GuideTemplate } from './guide/default'
import { AboutTemplate } from './page/about'
import { FaqTemplate } from './page/faq'
import { SingleWeddingTemplate } from './weddings/default'
import { ContactPageTemplate } from './page/contact'
import { PackagesPageTemplate } from './page/packages'
import { InfoPageTemplate } from './info/default'
import { SinglePackagesTemplate } from './packages/default'
import { SingleHighlightTemplate } from './highlights/default'

const templates: Templates = {
  page: {
    default: DefaultPageTemplate,
    about: AboutTemplate,
    faq: FaqTemplate,
    contact: ContactPageTemplate,
    packages: PackagesPageTemplate,
  },
  info: {
    default: InfoPageTemplate,
  },
  guides: {
    default: GuideTemplate,
  },
  archive: {
    weddings: WeddingPageTemplate,
  },
  packages: {
    packages: SinglePackagesTemplate,
  },
  highlights: {
    default: SingleHighlightTemplate,
  },
  weddings: {
    default: SingleWeddingTemplate,
  },
}

export default templates
