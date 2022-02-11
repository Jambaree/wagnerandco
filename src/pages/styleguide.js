import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

// Ours
import unesc from '../utils/unescape'
import { Wordmark, Monogram } from '../components/Logos'
import { H1, H2, H3, Intro } from '../components/Headings'
import Header from '../components/Header'
import VideoDemo from './video-demo'
import Doodle from '../components/Doodle'
import VideoLoop from '../components/VideoLoop'

const Label = props => (
  <div className={`h5 line-height-2 mb3 ${props.className}`} {...props} />
)

const DemoSubhead = props => (
  <div className="muted col-12 mb3">{props.label}</div>
)

const HeadingDemo = props => (
  <div className="sm-flex items-baseline mxn2 mt3 mb4">
    <div className="px2 muted col-12 sm-col-3">{props.label}</div>
    <div className="px2 col-12 sm-col-9 blue">
      <div className="mx-auto">{props.children}</div>
    </div>
  </div>
)

const StyleguidePage = props => {
  const site = props.data.wp.allSettings
  let title = `${unesc(site.generalSettingsTitle)} Styleguide`

  return (
    <div
      style={{ backgroundColor: '#FFF' }}
      className="p2 md-p3 lg-p4 sm-mb3 md-mb4">
      <Helmet>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header title={title} />

      <DemoSubhead label="loop demo" />
      <VideoLoop src={require('../loop/1.mp4')} />

      <DemoSubhead label="doodles" />
      <div className="flex flex-wrap mxn2 sm-mxn4">
        {['zag-single', 'zag', 'wave', 'line'].map((name, index) => {
          return (
            <div
              className="flex-auto px2 sm-px4 mb4"
              key={`Styleguide_${name}_${index}`}>
              <Label>doodle {name}</Label>
              <Doodle name={name} />
            </div>
          )
        })}
      </div>

      <div className="flex mb4">
        <div className="pr4">
          <Label>icon</Label>
          <Wordmark width={100} />
        </div>
        <div className="">
          <Label>icon</Label>
          <Monogram width={37} fillName="red" />
        </div>
      </div>
      <div>
        <Label>colors</Label>
        <div className="flex">
          {['blue', 'peach', 'white', 'red'].map((color, index) => {
            return (
              <div className="flex-auto" key={`Styleguide_${color}_${index}`}>
                <div className="mx-auto">
                  <div
                    style={{
                      width: '10vw',
                      height: '10vw',
                      maxWidth: '150px',
                      maxHeight: '150px',
                    }}
                    className={`bg-${color} circle mx-auto mb2`}
                  />
                  <Label className="h5 line-height-2 center">{color}</Label>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <HeadingDemo label="heading 1">
          <H1>Filmmakers doing weddings differently.</H1>
        </HeadingDemo>
        <HeadingDemo label="heading 2">
          <H2>Intermediate header not in original styleguide</H2>
        </HeadingDemo>
        <HeadingDemo label="heading 3">
          <H2>
            Super 8mm, that overflowing love, and your brilliant dance moves.
          </H2>
        </HeadingDemo>
        <HeadingDemo label="intro">
          <Intro>
            Eva and Ray's Brooklyn meets sleepy Shell Beach wedding in Tofino. A
            PARTY FOR THE AGES.
          </Intro>
        </HeadingDemo>
        <HeadingDemo label="thumbnail headlines">
          <div>
            <p>
              Lia and Jason captured{' '}
              <strong className="uppercase">in all their glory</strong> on Super
              8mm film
            </p>
            <p>
              <strong className="uppercase">The dance battle</strong> to end all
              dance battles starring Kelsay and Billy
            </p>
          </div>
        </HeadingDemo>
        <HeadingDemo label="bodycopy">
          <p>
            It had been a year since we last visited Tofino. Its gorgeous
            temperate rainforests and Salish Sea sprays always keep calling us
            back. Thanks to a quick jaunt over by seaplane, we were at the
            Wickinninish Inn in no time to join the legends,
          </p>
        </HeadingDemo>
        <HeadingDemo label="subhead all caps (replaced with h3)">
          <H3>What is Super 8MM, and why do you use it?</H3>
        </HeadingDemo>
      </div>
      <VideoDemo />
    </div>
  )
}

export default StyleguidePage

export const pageQuery = graphql`
  query StyleguideQuery {
    wp {
      allSettings {
        generalSettingsTitle
        generalSettingsUrl
        generalSettingsDescription
      }
    }
  }
`
