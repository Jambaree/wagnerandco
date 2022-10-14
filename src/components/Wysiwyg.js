import React from 'react'
import parse from 'html-react-parser'
import styled from '@emotion/styled'

const Wysiwyg = (props) => {
  const { content } = props

  let contentString
  if (typeof content === 'string' || content instanceof String) {
    contentString = content.toString().replace('data-srcset', 'srcset')

    return (
      <Container className="wysiwyg relative z-10 font-sans md:inline-block ">
        {parse(contentString)}
        {console.log(parse(contentString))}
      </Container>
    )
  } else {
    return null
  }
}

export default Wysiwyg
const Container = styled.div`
  position: relative;
  z-index: 10;
  display: inline-block;
  && {
    clear: both;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      &:not(:first-child) {
        margin-top: 3rem;
      }
    }

    p,
    ol,
    ul,
    li,
    figcaption,
    div {
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
      margin-top: 0;
      margin-bottom: 0;
    }
    p + p {
      text-indent: var(--space-3);
    }
    cite {
      opacity: 0.5;
      font-size: var(--h4);
      margin-left: var(--space-3);
    }
    cite:before {
      content: '—';
    }
    table {
      width: 100%;
      border-spacing: 0;
      margin-left: calc(-1 * var(--space-1));
      margin-right: calc(-1 * var(--space-1));
      font-feature-settings: 'tnum';
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
      margin-bottom: 20px;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 20px 0px;

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
        }
      }
    }

    .table-wrapper {
      width: 100%;
      max-width: 100%;
      flex: 1;
      overflow-x: auto;
    }

    table {
      border-collapse: separate;
      border-spacing: 2px;
      margin-left: 0;
      margin-right: 0;
      margin-top: 1.6rem;
      padding-bottom: 0;
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
      margin-bottom: 1.6rem;
      font-size: 1rem;
      line-height: 1.6rem;
      border-collapse: collapse;
      width: 100%;
    }
    td {
      display: table-cell;
      vertical-align: inherit;
      padding: var(--space-1);
    }
    tr {
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }
    td,
    th {
      text-align: left;
      border: 1px solid #e0e0e0;
      font-feature-settings: 'tnum';
      -moz-font-feature-settings: 'tnum';
      -ms-font-feature-settings: 'tnum';
      -webkit-font-feature-settings: 'tnum';
      padding-left: 1.06667rem;
      padding-right: 1.06667rem;
      padding-top: 0.8rem;
      padding-bottom: calc(0.8rem - 1px);
    }
    th:first-child,
    td:first-child {
      padding-left: 0.8rem;
    }
    tr:nth-of-type(2n + 1) td {
      background: var(--blue);
      color: var(--peach);
    }

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
