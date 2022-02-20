import axios from 'axios'

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem('user')
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch((err) => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = 'Sorry! the page you are looking for could not be found'
            break
          case 500:
            message =
              'Sorry! something went wrong, please contact our support team'
            break
          case 401:
            message = 'Invalid credentials'
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status === 400 || response.status === 500)
        throw response.data
      return response.data
    })
    .catch((err) => {
      throw err[1]
    })
}

// postForgetPwd
const postFakeForgetPwd = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status === 400 || response.status === 500)
        throw response.data
      return response.data
    })
    .catch((err) => {
      throw err[1]
    })
}

// Login Method
const postJwtProfile = (url, data) => {}

const postFakeProfile = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status === 400 || response.status === 500)
        throw response.data
      return response.data
    })
    .catch((err) => {
      throw err[1]
    })
}

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch((err) => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = 'Sorry! the page you are looking for could not be found'
            break
          case 500:
            message =
              'Sorry! something went wrong, please contact our support team'
            break
          case 401:
            message = 'Invalid credentials'
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status === 400 || response.status === 500)
        throw response.data
      return response.data
    })
    .catch((err) => {
      throw err[1]
    })
}

// postForgetPwd
const postJwtForgetPwd = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status === 400 || response.status === 500)
        throw response.data
      return response.data
    })
    .catch((err) => {
      throw err[1]
    })
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
}
