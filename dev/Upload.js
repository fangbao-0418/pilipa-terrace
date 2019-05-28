import React from 'react'
import http from '../components/http'
class Main extends React.Component {
  componentDidMount () {
    http('/user/v1/api/company/login/region', 'POST', ['Agent', 'DirectCompany'])
    http('/outside/v1/api/task/outside/list?tabName=UNDISTRIBUTED&extshow=true&pageSize=15&pageCurrent=1&rootAreaId=16&provinceId=210000', {
      cityId: undefined,
      orgId: ''
    })
    http('/outside/v1/api/template/product', {
      data: {
        type: 'OUTSIDE',
        companyId: 0
      }
    })
  }
  render () {
    return (
      <div style={{margin: 20}}>
        <div>
          <input
            ref='file'
            type='file'
          />
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              const el = this.refs.file
              const file = el.files[0]
              const query = {
                agencyId: 1,
                customerSource: 3,
                salesPersonIds: '',
                salesPersonNames: '',
                cityCode: 110100,
                cityName: '北京市'
              }
              if (file) {
                const data = new FormData()
                data.append('file', file)
                for (const key in query) {
                  if (query.hasOwnProperty(key)) {
                    data.append(key, query[key])
                  }
                }
                http('/crm-manage/v1/api/customer/upload/1', 'POST', {
                  processData: false,
                  contentType: false,
                  timeout: 1000000,
                  // headers: {
                  //   'Content-Type': 'multipart/form-data'
                  // },
                  data
                })
              }
            }}
          >
            提交
          </button>
        </div>
      </div>
    )
  }
}
export default Main
