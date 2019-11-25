const express = require('express')
const router = express.Router()

const loginCtrl = require('../controller/loginCtrl')

router
.post('/login.do', (req, res) => {
    loginCtrl.handleLogin(req, res)
})
.post('/loginOut', (req, res) => {
    loginCtrl.handleLogout(req, res)
})

module.exports = router