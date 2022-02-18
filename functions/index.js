const functions = require('firebase-functions')
const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const https = require('https')

const admin = require('firebase-admin')
require('dotenv').config()

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const auth = admin.auth()
const db = admin.firestore()

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(allowCrossDomain)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/test', (req, res) => res.send('Backend reached.'))

// app.put('/clear-logs', async (req, res) => {
//   try {
//     let query = db.collection('activity_log')
//     let response = []
//     await query.get().then((querySnapshot) => {
//       let docs = querySnapshot.docs
//       for (let doc of docs) {
//         const selectedItem = {
//           id: doc.id,
//           ...doc.data(),
//         }
//         response.push(selectedItem)
//       }
//     })

//     // response = response.filter((item) => {
//     //   return item.time.substring(5, 9) !== '2022'
//     // })

//     // for (let i = 0; i < response.length; i++) {
//     //   let document = db.collection('activity_log').doc(response[i].id)
//     //   await document.delete()
//     // }

//     return res.status(200).send({ length: response.length })
//   } catch (error) {
//     console.log(error)
//     return res.status(500).send(error)
//   }
// })

app.post('/api/user', async (req, res) => {
  try {
    const { email, ministryCode, ministry, department } = req.body

    await db.collection('users').doc(email).set({
      ministryCode: ministryCode,
      ministry: ministry,
      department: department,
    })

    return res.status(200).json({
      res: `User successfully created.`,
    })
  } catch (error) {
    console.clear()
    return res.status(500).json({ res: error.message })
  }
})

app.post('/sms', (req, res) => {
  let username = 'xavier_africa'
  let password = '@Xav!er123'

  // user: process.env.EMAIL,
  // pass: process.env.PASSWORD,

  let postData = JSON.stringify({
    to: req.body.to,
    body: req.body.body,
  })

  let options = {
    hostname: 'api.bulksms.com',
    port: 443,
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
      Authorization:
        'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
    },
  }

  req = https.request(options, (resp) => {
    console.log('statusCode:', resp.statusCode)
    let data = ''
    resp.on('data', (chunk) => {
      data += chunk
    })
    resp.on('end', () => {
      console.log('Response:', data)
    })
  })

  req.on('error', (e) => {
    console.error(e)
  })

  req.write(postData)
  req.end()
})

// Send Enquiry
app.post('/api/enquiry', (req, res) => {
  ;(async () => {
    try {
      await db.collection('Enquiries').add({
        phoneNumber: req.body.phoneNumber,
        enquiry: req.body.enquiry,
        ministryCode: req.body.ministryCode,
        id_Number: req.body.id_Number,
        status: 'Pending',
        fileLinks: req.body.fileLinks,
      })
      return res.status(200).json({ res: 'success' })
    } catch (error) {
      console.clear()
      return res.status(500).send(error)
    }
  })()
})

//get Enquiries
app.get('/api/enquiries', (req, res) => {
  ;(async () => {
    try {
      let query = db.collection('Enquiries')
      let response = []
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            ...doc.data(),
          }
          response.push(selectedItem)
        }
      })
      return res.status(200).send(response)
    } catch (error) {
      console.clear()
      return res.status(500).send(error)
    }
  })()
})

//Update Enquiry Status
app.put('/api/enquiry/:id', (req, res) => {
  ;(async () => {
    // console.log(req.body)
    try {
      let id = req.params.id
      let status = req.body.status

      let query = db.collection('Enquiries')
      let response
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs
        for (let doc of docs) {
          if (doc.id === id) {
            db.doc(`Enquiries/${doc.id}`).update({
              status: status,
            })
            response = {
              status: status,
            }
            break
          } else {
            response = {
              status: 'not successful',
            }
          }
        }
      })
      return res.status(200).json({ response })
    } catch (error) {
      console.clear()
      // return res.status(500).send(error)
    }
  })()
})
// Get specific Enquiry
app.get('/api/enquiry/:id', (req, res) => {
  ;(async () => {
    try {
      let id = req.params.id
      let query = db.collection('Enquiries').doc(id)
      let response = {}
      await query.get().then((querySnapshot) => {
        let doc = querySnapshot
        const selectedItem = {
          id: doc.id,
          ...doc.data(),
        }
        response = selectedItem
      })
      return res.status(200).send(response)
    } catch (error) {
      console.clear()
      return res.status(500).send(error)
    }
  })()
})

// Send Feedback
app.post('/api/feedback', (req, res) => {
  ;(async () => {
    try {
      await db.collection('Feedbacks').add({
        phoneNumber: req.body.phoneNumber,
        ministry: req.body.ministry,
        serviceName: req.body.serviceName,
        qualityOfService: req.body.qualityOfService,
        rating: req.body.rating,
        location: req.body.location,
      })
      return res.status(200).json({ res: 'success' })
    } catch (error) {
      console.clear()
      return res.status(500).send(error)
    }
  })()
})

//get Feedbacks
app.get('/api/feedbacks', (req, res) => {
  ;(async () => {
    try {
      let query = db.collection('Feedbacks')
      let response = []
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            ...doc.data(),
          }
          response.push(selectedItem)
        }
      })
      return res.status(200).send(response)
    } catch (error) {
      console.clear()
      return res.status(500).send(error)
    }
  })()
})

// Get specific Feedback
app.get('/api/feedback/:id', (req, res) => {
  ;(async () => {
    try {
      let id = req.params.id
      let query = db.collection('Feedbacks').doc(id)
      let response = {}
      await query.get().then((querySnapshot) => {
        let doc = querySnapshot
        const selectedItem = {
          id: doc.id,
          ...doc.data(),
        }
        response = selectedItem
      })
      return res.status(200).send(response)
    } catch (error) {
      console.clear()
      return res.status(500).send(error)
    }
  })()
})

app.get('/api/user/:email', async (req, res) => {
  try {
    let { email } = req.params
    let query = db.collection('users').doc(email)
    let response = {}
    await query.get().then((querySnapshot) => {
      let doc = querySnapshot
      const selectedItem = {
        id: doc.id,
        ...doc.data(),
      }
      response = selectedItem
      return res.status(200).json({ data: response })
    })
  } catch (error) {
    console.clear()
    return res.status(500).json({ error: error.message })
  }
})

exports.app = functions.https.onRequest(app)
