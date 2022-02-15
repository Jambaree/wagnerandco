import React from 'react'
import PropTypes from 'prop-types'
// import { StaticQuery, graphql } from 'gatsby'
import reactHtmlParser from 'react-html-parser'
import slugify from 'slugify'
import EmbedInstagram from 'react-instagram-embed'
// import Embed from 'react-embed'
import VideoLoop from './VideoLoop'

// Gutenberg
import Video from './Video'
import GravityForms from './GravityForms'
import GravityFormIFrame from './GravityFormIFrame'

const getBlockClass = function(name) {
  return `block_${name.replace('/', '_')}`
}

// List from WordPress theme:

// Round 1
// - [x] core/paragraph
// - [x] core/image
// - [ ] core/image, with Gatsby Image
//     (still doesn’t seem practical as of March 2020, it’s being worked on
//     for Gatsby Source WordPress v4 by that developer in Vancouver)
// - [x] core/heading
// - [x] core/list
// - [x] core/html

// Round 2
// - [x] core/gallery
// - [x] core/quote (blockquote)
// - [x] core/table
// - [x] core/button
// - [x] core/separator
// - [x] core/spacer

// Round 3
// - [x] core/video using hosted video
//       (accepts either .webm or .mp4, and assumes same filename for other)

// Core Embed
// Should be able to add oEmbed plugin for this,
// there doesn’t seem to be any advantage to using
// the individual embeds vs. the URL embed, unless
// you are overriding the UI in one place but not the other
// - [ ] ~~core/embed~~ // Round 2
//   - This actually comes through as a specific embed, ex. core-embed/instagram
// - [x] core-embed/instagram // Round 2
// - [x] core-embed/vimeo // Round 1

// Plugin
// - [x] gravityforms/form // Round 1

const handleTransformImage = function(node) {
  if (node.type === 'tag') {
    switch (node.name) {
      case 'img':
        // TODO Need to match this file ID to another query
        // or add queries to a list and perform them to
        // get all the images (not possible right now, because
        // there isn’t a query like allGutenbergImages or something,
        // because Gutenberg blocks are all innerHTML)
        //   The only obvious alternative to me is to use ACF blocks
        // instead of Gutenberg blocks.
        if (node.attribs['data-src']) {
          node.attribs.src = `${node.attribs['data-src']}`
          node.attribs.style = `${node.attribs['style']}`
          node.attribs.class += ' block col-12'
          break
        }

      // case 'figure':
      //   node.attribs.class += ' lg-mxn4'
      //   break
      case 'figcaption':
        node.attribs.class += ' muted'
        break
      default:
        return undefined
    }
  }
}

const handleTransformVideo = function(node, index) {
  if (!node || typeof node.children === 'undefined' || !node.children.length) {
    return null
  }

  let child = node.children[0]

  if (child.type === 'tag' && child.name === 'video') {
    return (
      <figure
        key={`VideoLoop_${index}`}
        className={`${node.attribs.class} block col-12`}>
        <VideoLoop
          poster={`${child.attribs.poster}`}
          src={`${child.attribs.src}`}
        />
      </figure>
    )
  }

  return <div></div>
}

const gutenbergBlocks = {
  core: {
    image: function(props) {
      let { originalContent } = props
      let content = reactHtmlParser(originalContent, {
        transform: handleTransformImage,
      })

      // const iterate = function(a, index) {
      //   if (a && a.props && a.props.children && a.props.children.length >= 1) {
      //     a.props.children.forEach(function(b, index) {
      //       iterate(b, index)
      //     })
      //   }
      //   if (a.props && a.props.src) {
      //     // a = React.cloneElement(a, { src: 'https://placehold.it/800x600' })
      //     a = <h1>Hello</h1>
      //   }
      // }
      //
      // content.forEach((a, index) => {
      //   iterate(a, index)
      // })

      return <div>{content}</div>
    },
    gallery: function(props) {
      let { originalContent, name, className } = props

      // A different approach for replacing the URL
      // return (
      //   <div
      //     dangerouslySetInnerHTML={{
      //       __html: innerHTML
      //         .split('src="/')
      //         .join(`src="${process.env.GATSBY_WP_URL}/`),
      //     }}
      //   />
      // )

      let content = reactHtmlParser(originalContent, {
        transform: handleTransformImage,
      })

      return (
        <div className={`${getBlockClass(name)} ${className || ''}`}>
          {content}
        </div>
      )
    },
    video: function(props) {
      let { originalContent, name, className } = props

      let content = reactHtmlParser(originalContent, {
        transform: handleTransformVideo,
      })

      return (
        <div className={`${getBlockClass(name)} ${className || ''}`}>
          {content}
        </div>
      )
    },
    default: function(props) {
      // eslint-ignore
      let {
        originalContent,
        name,
        className,
        attributes,
        ...remainingProps
      } = props
      let content = reactHtmlParser(originalContent)

      if (name === 'core/heading') {
        let label = content[0].props.children[0]

        // If the label isn’t a string by this point,
        // there might be more depth of content, and it probably
        // isn’t actually a heading. So we don’t do anything with it.
        if (label && typeof label === 'string') {
          remainingProps.id = slugify(label.toLowerCase())
        }
      }

      return (
        <div
          className={`${getBlockClass(name)} ${className || ''}`}
          {...remainingProps}>
          {content}
        </div>
      )
    },
  },
  coreEmbed: {
    vimeo: function(props) {
      let { originalContent } = props
      let content = reactHtmlParser(originalContent)
      let wpFigure = content[0].props.children
      let vimeoUrl = wpFigure[0].props.children[0]
      let caption = null
      if (wpFigure.length === 2) {
        caption = wpFigure[1]
      }

      let vimeoId = vimeoUrl.split('/')
      vimeoId = vimeoId[vimeoId.length - 1]

      return (
        <figure>
          <Video vimeoId={vimeoId} />
          {caption ? (
            <figcaption className="muted">{caption}</figcaption>
          ) : null}
        </figure>
      )
    },
    instagram: function(props) {
      let { originalContent, name, className } = props
      let content = reactHtmlParser(originalContent)
      let div = content[0].props.children

      if (div) {
        let url = div[0].props.children[0].trim()

        if (url) {
          return (
            <figure className={`${getBlockClass(name)} ${className || ''}`}>
              <EmbedInstagram
                url={url}
                maxWidth={768}
                hideCaption={false}
                injectScript={true}
              />
            </figure>
          )
        }
      }

      return (
        <div
          dangerouslySetInnerHTML={{
            __html: originalContent,
          }}
        />
      )
    },
    // Works
    // default: function(props) {
    //   let { innerHTML, blockName, className } = props
    //   let content = reactHtmlParser(innerHTML)
    //   let div = content[0].props.children
    //
    //   if (div) {
    //     let url = div[0].props.children[0].trim()
    //
    //     if (url) {
    //       return (
    //         <figure
    //           className={`${getBlockClass(blockName)} ${className || ''}`}>
    //           <Embed url={url} />
    //         </figure>
    //       )
    //     }
    //   }
    //
    //   return (
    //     <div
    //       dangerouslySetInnerHTML={{
    //         __html: innerHTML,
    //       }}
    //     />
    //   )
    // },
  },
  gravityforms: {
    form: function(props) {
      let { attributes } = props
      let matchingForm = {}

      // Get all forms, and then filter by id. We end up with data for all the
      // other forms that we don’t need.
      if (props.allGfForm && props.allGfForm.edges) {
        props.allGfForm.edges.some(({ node }) => {
          if (node.formId.toString() === attributes.formId.toString()) {
            matchingForm = node
            return true
          }

          return false
        })
      }

      return (
        <GravityForms
          showTitle={true}
          formId={matchingForm.formId}
          url={process.env.GATSBY_WP_URL}
          data={matchingForm}
        />
      )
    },
    iframe: function(props) {
      let { attributes } = props
      return <GravityFormIFrame formId={attributes.formId} />
    },
  },
}

const blocks = {
  'core/image': gutenbergBlocks.core.image,
  'core/gallery': gutenbergBlocks.core.gallery,
  'core/embed': gutenbergBlocks.core.embed, //
  'core/video': gutenbergBlocks.core.video,
  'core/default': gutenbergBlocks.core.default,
  'core-embed/vimeo': gutenbergBlocks.coreEmbed.vimeo,
  'core-embed/instagram': gutenbergBlocks.coreEmbed.instagram,
  // 'core-embed/default': gutenbergBlocks.coreEmbed.default,

  // 'gravityforms/form': gutenbergBlocks.gravityforms.form,
  'gravityforms/form': gutenbergBlocks.gravityforms.iframe,
}

const GutenbergBlocks = props => {
  if (props.blocks && props.blocks.length >= 1) {
    //   // Run one parent StaticQuery with all the data we might
    //   // need to pass down to individual Gutenberg blocks
    //   // TODO Make query same graphql fragment on Contact page and nodes here?
    //   // TODO Confirmation message
    //   return (
    //     <StaticQuery
    //       query={graphql`
    //         {
    //           allGfForm {
    //             edges {
    //               node {
    //                 id
    //                 formId
    //                 title
    //                 labelPlacement
    //                 descriptionPlacement
    //                 button {
    //                   type
    //                   text
    //                 }
    //                 formFields {
    //                   id
    //                   formId
    //                   label
    //                   labelPlacement
    //                   description
    //                   descriptionPlacement
    //                   type
    //                   isRequired
    //                   placeholder
    //                   defaultValue
    //                   # maxLength
    //                   # phoneFormat
    //                   inputMask
    //                   inputMaskValue
    //                   size
    //                   # rangeMin
    //                   # rangeMax
    //                   # Fixed in @kennethormandy/gatsby-source-wordpress2.0.85-ko.2
    //                   # choices {
    //                   #   text
    //                   #   value
    //                   #   isSelected
    //                   #   price
    //                   # }
    //                   choices
    //                   # HTML inputs
    //                   content
    //
    //                   # Conditional Logic support is partially implemented,
    //                   # but it ended up making much more sense to use the
    //                   # iframe embeds as we used more of Gravity Forms
    //                   # conditionalLogic
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       `}
    //       render={data => {
    return props.blocks.map((block, index) => {
      if (block && block.name) {
        let blockName

        if (block.name && blocks[block.name]) {
          blockName = block.name
        } else if (
          block.name &&
          block.name.includes('core-embed') &&
          blocks['core-embed/default']
        ) {
          blockName = 'core-embed/default'
        } else {
          blockName = 'core/default'
        }

        // if (blockName === 'gravityforms/form') {
        //   block.allGfForm = data.allGfForm
        // }

        let El = blocks[blockName]
        return <El key={`block_${block.name}_${index}`} {...block} />
      }

      return null
    })
    //       }}
    //     />
    //   )
  }

  return null
}

GutenbergBlocks.defaultProps = {}
GutenbergBlocks.propTypes = {
  blocks: PropTypes.array.isRequired,
}

export default GutenbergBlocks
