import slugify from 'slugify'

const headlineBlocksToNav = function (modules) {
  let sidebarItems = []

  if (modules && modules.length >= 1) {
    modules.forEach(function (block) {
      if (block.fieldGroupName.split('_').slice(-1)[0] === 'BlockHeadline') {
        let label = block?.heading

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

export default headlineBlocksToNav
