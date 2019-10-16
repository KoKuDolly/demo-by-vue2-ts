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
      cid: 'cid',
      companyName: '公司名称',
      companyNameAbbr: '公司简称',
      apiCode: 'apiCode',
      formStatus: '表单状态',
      createPerson: '创建者',
      createTime: '创建时间',
    }

    let perData = {}

    for (const key of Object.keys(initData)) {
      perData = {
        ...perData,
        ...Mock.mock({
          [`${key}|2`]: initData,
        })
      }
    }
    
    let data = []
    for (let i = 0; i < 30; i++) {
      data.push(perData)
    }
    res.json({
      code: '000000',
      data: {
        records: data,
        total: data.length,
      },
      message: '000000'
    })
  },
  handleInfoDetail(req, res) {
    res.json({
      code: '000000',
      data: {

      },
      message: 'success'
    });
  }
}

