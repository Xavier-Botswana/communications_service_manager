const axios = require('axios')
const { firebase } = require('./firebase')

const baseurl = `https://us-central1-gov-communications.cloudfunctions.net/app`

const sendSMS = (to, body, department) => {
  console.log(department)
  axios
    .post(`${baseurl}/api/sms`, {
      to: to,
      body: body,
    })
    .then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        // firebase.logMessageSent(department, to, 'Delivered', body)
        const currentdate = new Date()
        const datetime =
          currentdate.getDate() +
          '/' +
          (currentdate.getMonth() + 1) +
          '/' +
          currentdate.getFullYear() +
          ' @ ' +
          currentdate.getHours() +
          ':' +
          currentdate.getMinutes() +
          ':' +
          currentdate.getSeconds()
        axios
          .post(`${baseurl}/api/delivery-status`, {
            date: datetime,
            department: department,
            recipient: to,
            status: 'Delivered',
            message: body,
          })
          .then((res) => {
            console.log(res.status)
          })
          .catch((error) => {
            console.log(error.message)
          })
      } else {
        // firebase.logMessageSent(department, to, 'Delivered', body)
        const currentdate = new Date()
        const datetime =
          currentdate.getDate() +
          '/' +
          (currentdate.getMonth() + 1) +
          '/' +
          currentdate.getFullYear() +
          ' @ ' +
          currentdate.getHours() +
          ':' +
          currentdate.getMinutes() +
          ':' +
          currentdate.getSeconds()
        axios
          .post(`${baseurl}/api/delivery-status`, {
            date: datetime,
            department: department,
            recipient: to,
            status: 'Failed',
            message: body,
          })
          .then((res) => {
            console.log(res.status)
          })
          .catch((error) => {
            console.log(error.message)
          })
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export default sendSMS
