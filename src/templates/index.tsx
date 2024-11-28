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
import { InfoPageTemplate } from './archive/info'
import { SingleInfoTemplate } from './info/default'
import { SingleHighlightTemplate } from './highlights/default'
import { ServicesPageTemplate } from './archive/services'
import { SingleServiceTemplate } from './service/default'

const templates: Templates = {
  page: {
    default: DefaultPageTemplate,
    about: AboutTemplate,
    faq: FaqTemplate,
    contact: ContactPageTemplate,
    packages: PackagesPageTemplate,
    services: ServicesPageTemplate,
  },
  info: {
    default: SingleInfoTemplate,
  },
  guides: {
    default: GuideTemplate,
  },
  archive: {
    weddings: WeddingPageTemplate,
    info: InfoPageTemplate,
    service: ServicesPageTemplate,
  },
  service: {
    default: SingleServiceTemplate,
  },

  highlights: {
    default: SingleHighlightTemplate,
  },
  weddings: {
    default: SingleWeddingTemplate,
  },
}

export default templates
