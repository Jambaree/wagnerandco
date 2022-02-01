let getConfirmationMessage = results => {
  let confirmationMessage = null
  if (results && results.confirmations) {
    let confirmationKey = Object.keys(results.confirmations)[0]
    confirmationMessage = results.confirmations[confirmationKey]
      ? results.confirmations[confirmationKey].message
      : undefined
  }

  return confirmationMessage
}

export default getConfirmationMessage
