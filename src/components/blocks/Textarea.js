'use client'
import React from 'react'
import Parser from 'html-react-parser'
import styled from '@emotion/styled'

const Textarea = (props) => {
  const { content } = props

  let contentString
  if (typeof content === 'string' || content instanceof String) {
    let contentString = content
      .toString()
      .trim()
      // remove default html tags, inserted by cherio js
      .replace('<html>', '')
      .replace('</html>', '')
      .replace('<head>', '')
      .replace('</head>', '')
      .replace('<body>', '')
      .replace('</body>', '')
      // remove line breaks to fix table errors
      .replace(/(\r\n|\n|\r)/gm, '')
      // wrap table into div to make it responsive
      .replace(/<table/g, "<div class='table-wrapper'><table")
      .replace(/\/table>/g, '/table></div>')
      .replace(/<iframe/g, "<div class='iframe-wrapper'><iframe")
      .replace(/\/iframe>/g, '/iframe></div>')

    return <Container>{Parser(contentString)}</Container>
  } else {
    return null
  }
}

export default Textarea
const Container = styled.div`
  && {
    clear: both;

    &:after {
      content: '';
      display: block;
      clear: both;
    }
    span {
      margin-bottom: 2rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    }

    p,
    ol,
    ul,
    li,
    figcaption,
    div {
    }
    figcaption {
      text-align: center;
    }
    figure {
      margin-top: 2rem;
    }
    li > ul {
      margin-top: 20px;
    }

    a {
      text-decoration: none;
      font-weight: 500;
    }
    hr {
      width: 66.6%;
      margin-top: 19vh;
      margin-bottom: 21vh;
    }
    blockquote {
      border-left: var(--border-width-medium, 2px) solid;
      margin-left: var(--space-3);
      font-size: var(--h3);
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
      padding-left: var(--space-3);
    }
    p {
      margin-bottom: 1rem;
      margin-top: 0 !important;
    }
    /* p + p {
      text-indent: var(--space-3);
    } */
    cite {
      opacity: 0.5;
      font-size: var(--h4);
      margin-left: var(--space-3);
    }
    cite:before {
      content: '—';
    }

    figcaption {
      font-size: 12px;
      line-height: 16px;
      text-transform: uppercase;
    }

    ul,
    ol {
      margin-left: 25px;
    }

    ul li {
      list-style: disc;
    }

    img {
      width: 100%;
      height: 100%;

      &.alignright {
        float: right;
        margin-left: 20px !important;
      }

      &.alignleft {
        float: left;
        margin-right: 20px !important;
      }

      &.size-medium {
        width: 300px;
      }

      &.size-thumbnail {
        width: 150px;
      }

      &.size-full {
      }

      &.fullwidth {
        width: 100%;
      }

      @media (max-width: 420px) {
        width: 100% !important;
      }
    }

    .inline-block {
      img {
        @media (max-width: 420px) {
          width: auto !important;
          height: auto;
        }
      }
    }

    table {
      width: 100%;
      border-spacing: 0;
      margin-left: calc(-1 * var(--space-1));
      margin-right: calc(-1 * var(--space-1));
      font-feature-settings: 'tnum';
    }

    td {
      padding: var(--space-1);
    }
    tr:nth-of-type(2n + 1) td {
      background: var(--blue);
      color: var(--peach);
      a {
        color: var(--red);
      }
    }

    cite {
      opacity: 0.5;
      font-size: var(--h4);
      margin-left: var(--space-3);
    }
    hr {
      width: 66.6%;
      margin-top: 19vh;
      margin-bottom: 21vh;
    }

    blockquote {
      border-left: var(--border-width-medium, 2px) solid;
      margin-left: var(--space-3);
      font-size: var(--h3);
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
      padding-left: var(--space-3);
    }

    .block_core_quote p {
      margin-top: 0;
      margin-bottom: 0;
    }

    /* .block_core_quote p + p {
      text-indent: var(--space-3);
    } */

    .iframe-wrapper {
      overflow: hidden;
      // Calculated from the aspect ration of the content (in case of 16:9 it is 9/16= 0.5625)
      padding-top: 56.25%;
      position: relative;
    }

    .iframe-wrapper iframe {
      border: 0;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
`
