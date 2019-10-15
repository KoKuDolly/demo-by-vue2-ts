const Mock = require('mockjs');

const cidDataEmpty = {
  cid: '',
  area: '',
  companyName: '',
  companyAbbreviation: '',
  businesserName: '',
  riskerName: '',
  financialLicenceType: '',
  financialSublicenseType: '',
  isLicensed: '',
  apicodeList: [
    {
      apiCode: '',
      companyId: '',
      id: '',
      remark: '',
      status: '',
      apicodeFormList: [
        {
          apiCode: '',
          applicationScenario: '',
          businessScenario: '',
          companyId: '',
          creditEnd: '',
          creditStart: '',
          department: '',
          id: '',
          incomingChannel: '',
          loanCycle: '',
          loanRate: '',
          loanType: '',
        },
      ],
    },
  ],
};

module.exports = {
  handleCompanyList(req, res) {
    const initData = {
      cid: '',
      area: '',
      companyName: '',
      companyAbbreviation: '',
      businesserName: '',
      riskerName: '',
      financialLicenceType: '',
      financialSublicenseType: '',
      isLicensed: '',
    }

    let perData = {}

    for (const key of Object.keys(initData)) {
      perData = {
        ...perData,
        ...Mock.mock({
          [`${key}|1-100.1-100`]: 1,
        })
      }
    }
    
    let data = []
    for (let i = 0; i < 30; i++) {
      data.push(perData)
    }
    res.json({
      code: '000000',
      data,
      message: 'success'
    })
  }
}

