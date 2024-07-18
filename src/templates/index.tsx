import type { Templates } from '@nextwp/core'
import { DefaultPageTemplate } from './page/default'

// import {DefaultHomeTemplate} from "./page/homeTemplate";

import { WeddingPageTemplate } from './archive/weddings'
import { GuideTemplate } from './guide/default'
import { AboutTemplate } from './page/about'
import { FaqPageTemplate } from './page/faq'
import { SingleWeddingTemplate } from './weddings/default'
import { ContactPageTemplate } from './page/contact'

const templates: Templates = {
  page: {
    default: DefaultPageTemplate,
    about: AboutTemplate,
    faq: FaqPageTemplate,
    contact: ContactPageTemplate,
  },

  guide: {
    default: GuideTemplate,
  },
  archive: {
    weddings: WeddingPageTemplate,
  },
  weddings: {
    default: SingleWeddingTemplate,
  },
}

export default templates
