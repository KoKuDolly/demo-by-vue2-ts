const express = require('express')
const router = express.Router()

const indexCtrl = require('../controller/indexCtrl.js')
const infoCtrl = require('../controller/infoCtrl.js')

router
  .get('/', (req, res) => {
    indexCtrl.showIndexPage(req, res)
  })
  .get('/api/approval-service/examine/report', (req, res) => {
    indexCtrl.handleReport(req, res)
  })
  .post('/api/company/list', (req, res) => {
    console.log('leave')
    infoCtrl.handleCompanyList(req, res)
  })
  .post('/api/company/apicode/detail', (req, res) => {
    infoCtrl.handleInfoDetail(req, res)
  })

module.exports = router