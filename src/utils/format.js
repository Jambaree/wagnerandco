import React from 'react'

const timestampRange = function (start, end) {
  start = timestamp(start, false)
  end = timestamp(end)
  let divider = '–'

  if (start === '' || end === '') {
    return null
  } else if (start === '00' || end === '00') {
    return null
  } else {
    let result = `${start}${divider}${end}`
    return result
  }
}

const timestamp = function (str, showUnit = true) {
  let units = [' hour', ' minute', ' second']
  // let largestUnitIndex = units.length - 1
  let largestUnitIndex = 1
  let plural = false

  let result = (str && str.includes(':') && str.split(':')) || null
  result =
    result &&
    result.map((num, index) => {
      if (index === 2) {
        return num
      }

      num = parseInt(num, 10)
      if (num > 0) {
        // largestUnitIndex = Math.min(largestUnitIndex, index)

        // Turn minutes into hours
        if (index === 0) {
          num = num * 60
        }

        if (num > 1) {
          plural = true
        }
        return num
      }

      return ''
    })

  result =
    result &&
    result
      .join(' ')
      .trim()
      .split(' ')
      .join(':')
      .replace('::', ':')
      .replace(':00', '')

  if (result === '') {
    return ''
  } else {
    let unit = `${units[largestUnitIndex]}${plural ? 's' : ''}`
    return `${result}${showUnit ? unit : ''}`
  }
}

const priceOpts = {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 0,
}

// https://stackoverflow.com/a/16233919/864799
const priceFormatter = new Intl.NumberFormat('en-CA', priceOpts)

const price = function (str, currencyCode) {
  let num = parseFloat(str, 10)

  if (typeof currencyCode === 'undefined') {
    currencyCode = priceOpts.currency
  }

  if (typeof Intl !== 'undefined') {
    return `${priceFormatter.format(num)} ${currencyCode}`
  } else {
    return `$${num} ${currencyCode}`
  }
}

const lowercaseFirstLetter = function (string) {
  return string?.charAt(0)?.toLowerCase() + string.slice(1)
}

const subtitleStringToObj = function (full, short, opt) {
  opt = opt || { bold: false }
  let fullSplit = full.split(short)

  if (fullSplit.length === 2) {
    let widontIndex = fullSplit[1].lastIndexOf(' ')
    fullSplit[1] = fullSplit[1].split('')
    fullSplit[1].splice(widontIndex, 1, ' ') // &nbsp;

    return (
      <span className={`font-weight-${opt.bold === true ? '500' : '400'}`}>
        {fullSplit[0]}
        <strong
          className={`uppercase font-weight-${
            opt.bold === true ? '600' : '500'
          }`}>
          {short}
        </strong>
        {fullSplit[1]}
      </span>
    )
  }

  return full
}

const subtitle = function (full, short, opt) {
  opt = opt || { bold: false }
  // console.log(opt)
  // console.log(short)
  let shortLower = lowercaseFirstLetter(short.rendered)
  let result = full

  if (full.includes(short.rendered)) {
    return subtitleStringToObj(full, short.rendered, opt)
  } else if (full.includes(shortLower)) {
    return subtitleStringToObj(full, shortLower, opt)
  }

  return result
}

const stripTrailingSlash = function (str) {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1)
  }
  return str
}

export default {
  timestamp,
  timestampRange,
  price,
  subtitle,
  stripTrailingSlash,
}
export { timestamp, timestampRange, price, subtitle, stripTrailingSlash }
