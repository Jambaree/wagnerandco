import reactHtmlParser from 'react-html-parser'
import slugify from 'slugify'

const gutenbergBlocksToNav = function(blocks, allowedBlockName) {
  allowedBlockName = allowedBlockName || 'core/heading'
  let sidebarItems = []

  if (blocks && blocks.length >= 1) {
    blocks.forEach(function(block) {
      if (block.name === allowedBlockName) {
        let content = reactHtmlParser(block.originalContent)
        let label = content[0].props.children[0]

        // If the label isn’t a string by this point,
        // there might be more depth of content, and it probably
        // isn’t actually a heading. So we don’t do anything with it.
        if (label && typeof label === 'string') {
          sidebarItems.push({
            label: label,
            href: `#${slugify(label.toLowerCase())}`,
          })
        }
      }
    })
  }
  return sidebarItems
}

export default gutenbergBlocksToNav
