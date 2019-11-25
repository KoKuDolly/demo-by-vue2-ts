const Mock = require('mockjs')

module.exports = {
    handleLogin: function(req, res) {
        console.log(req.body)
        const { userName, password } = req.body
        if (userName === 'admin' && password === '123456') {
            res.json({ code: '000000', message: '成功', data: {
                userInfo: {
                    userName: 'qjj',
                    name: '秦佳俊'
                },
                sessionId: '1232131322131231'
            } })
        } else {
            res.json({ code: '100001', message: '账号密码有误' })
        }
        
    },
    handleLogout: function(req, res) {
        res.json({ code: '000000', message: '退出成功' })
    }
}