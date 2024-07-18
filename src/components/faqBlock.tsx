import { H4 } from './Headings'

const List = ({ className = '', ...remainingProps }) => {
  return (
    <ul className={`list-style-none m0 p0 ${className}`} {...remainingProps} />
  )
}

export default function FaqBlock(props) {
  const {
    faqdata: {
      data: {
        acf: { wco_faq_item },
      },
    },
  } = props

  return (
    <div className="z1">
      <List>
        {wco_faq_item.map((item, index) => {
          return (
            <li className="md-mxn2 md-pr2 mb2" key={`PackagesFAQItem_${index}`}>
              <details className="m0 p0">
                <summary
                  className="cursor-pointer"
                  style={{ paddingBottom: '0.2em' }}>
                  <H4 is="span" underline>
                    <span className="border-bottom border-blue border-medium">
                      {item.wco_faq_question}
                    </span>
                  </H4>
                </summary>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.wco_faq_answer,
                  }}
                />
              </details>
            </li>
          )
        })}
      </List>
    </div>
  )
}
