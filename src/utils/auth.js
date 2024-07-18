// This approach is based on Gatsby Simple Auth
// example https://git.io/vpgqr MIT

const isBrowser = typeof window !== 'undefined'

const getUser = () =>
  window.localStorage.gatsbyUser
    ? JSON.parse(window.localStorage.gatsbyUser)
    : {}

const setUser = (user) =>
  (window.localStorage.gatsbyUser = JSON.stringify(user))

export const handleLogin = ({ username, password, countryKey }) => {
  if (!isBrowser) return false
  console.log(process.env.NEXT_PUBLIC_WP_PAGE_PASSWORD)
  if (
    // window.atob(username) === `demo` &&

    password === process.env.NEXT_PUBLIC_WP_PAGE_PASSWORD
  ) {
    return setUser({
      loggedIn: true,
      countryKey: countryKey || null,
      // name: '',
      // email: 'you@example.com',
    })
  }

  return false
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const user = getUser()

  return !!user.loggedIn
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = (callback) => {
  if (!isBrowser) return

  // console.log(`Ensuring the \`gatsbyUser\` property exists.`)
  setUser({})
  if (callback && typeof callback === 'function') {
    callback()
  }
}
