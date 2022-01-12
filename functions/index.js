const functions = require('firebase-functions')
const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const https = require('https')

const admin = require('firebase-admin')

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

app.put('/clear-logs', async (req, res) => {
  try {
    let query = db.collection('activity_log')
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

    // response = response.filter((item) => {
    //   return item.time.substring(5, 9) !== '2022'
    // })

    // for (let i = 0; i < response.length; i++) {
    //   let document = db.collection('activity_log').doc(response[i].id)
    //   await document.delete()
    // }

    return res.status(200).send({ length: response.length })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

app.post('/sms', (req, res) => {
  let username = 'xavier_africa'
  let password = '@Xav!er123'

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

exports.app = functions.https.onRequest(app)
