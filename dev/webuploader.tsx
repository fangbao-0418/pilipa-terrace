import React from 'react'
import { webUploader } from '../components'
/* tslint:disable:max-line-length quotemark */
let ossCfg: any = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.NH84cxX8HiEPmgRgVbMDeoGhp\\\",\\\"AccessKeySecret\\\":\\\"JDzuRoLG5qfqUwpEht25KNvgDrKiNe7PvBuzFZEKVEzX\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIr4uNf9nMtedp3oe7b0Hjg1Y3QctJgILDkjz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutUzDHQ0IXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAGMU85J8OKdo2Um\/5e8DLGj\/SpUZlhKNwusEVnvkUBKXIX0raRl+vrDhSdlJNktjkarXP6rTcXR7qGd1axbHUaRVjtqZdCght7HJ4Buu5IkmSI1BNqm4Ba2oQWWwr8AL378+m2UkPv+HqH\/eNoSZK3Qw6I8ORiL6UDboTmjzW+ppg==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7427\/2018-06-30\\\",\\\"regionId\\\":\\\"cn-beijing\\\"}\"}")
ossCfg = JSON.parse(ossCfg.data)
let newOssCfg = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.NHLNFfNSNFUvVkqjiNWEKWZ6F\\\",\\\"AccessKeySecret\\\":\\\"7Baxu8VXnUk49qrRQoWiPETEWhuEMMLepaK4KzhPrj1F\\\",\\\"SecurityToken\\\":\\\"CAISrgJ1q6Ft5B2yfSjIr4v5BfzSo4xv8ZedVE3AjmkbW8pnuJ+dpDz2IH5Je3NgBOgdtfo+m2xX6P8alqF2TIVKTErzN5PJf1LjXUfzDbDasumZsJYU6vT8a3PxZjf/2MjNGaqbKPrWZvaqbX3diyZ32sGUXD6+XlujQ/rr7Jl8dYY4UxWfZzhLD8ssD2kEksIBMmbLPvuAKwPjhnGqbHBloQ1hk2hym+ndicSX8UjZl0aomPcUo4XpK92ha5tpO41wWtHyhqssLvORiHIXyWATr/op3fcaoGiY5Y7HWgUO2XjcbbqIqO8IBRRie603F5RDqPXBjvBisoTR7d+plkkXbbwNCH+BFd/8n5WdQPnYMc0iMK76P3XV25WKMtz7rgcgJHsQPw5RYMq69fyj85XwIBqAAT5A/nwrMyPm+7NEVqES452uwvYAzCzrYS+Z+7pJx8rQrC2PhcWBaI74nWCqWA5/XU3JjPhXuSX3Qd9niPOlXp5fUEK5goS0dqK4SILmU1NspyZZGsrIH70kzTFMnsqErtcBixDsjmbdU7MOOPECYayJjUPpop2hJZwwrsFwV0lD\\\",\\\"bucketName\\\":\\\"pilipa-ml\\\",\\\"dir\\\":\\\"morgan\/2\/201804\\\",\\\"regionId\\\":\\\"beijing\\\"}\"}")
newOssCfg = JSON.parse(newOssCfg.data)
export default class extends React.Component {
  public componentDidMount () {
    const uploader = new webUploader({
      accessKeyId: ossCfg.AccessKeyId,
      accessKeySecret: ossCfg.AccessKeySecret,
      stsToken: ossCfg.SecurityToken,
      bucket: ossCfg.bucketName,
      region: 'oss-cn-beijing',
      dir: ossCfg.dir,
      accept: ossCfg.accept,
      uploadTarget: '票据',
      // maxUploadNum: 19,
      mark: '西藏山峰广告装饰有限公司',
      callback: {
        url: "https://x-agent.i-counting.cn/api/v1/OSSCallBack.ashx",
        host: "x-agent.i-counting.cn",
        body: "filename=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&receiptid=0&typeid=1&companyid=7048&userid=665&self=0&companycode=5a93be1a85effd0001e7f7d0"
        // contentType: "application/json"
        // body: "filename=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&receiptid=${x:receiptid}&typeid=${x:typeid}&companyid=${x:companyid}&userid=${x:userid}&self=${x:self}&companycode=${x:companycode}",
        // customValue: {
        //   receiptid: "0",
        //   typeid: "1",
        //   companyid: "7048",
        //   userid: "665",
        //   self: "0",
        //   companycode: "5a93be1a85effd0001e7f7d0"
        // }
      }
    })
    uploader.on('error', () => {
      uploader.trigger('oss-update', {
        accessKeyId: newOssCfg.AccessKeyId,
        accessKeySecret: newOssCfg.AccessKeySecret,
        stsToken: newOssCfg.SecurityToken,
        bucket: newOssCfg.bucketName,
        region: 'oss-beijing',
        dir: newOssCfg.dir
      })
    })
    uploader.on('complete', (urls) => {
      console.log(urls, '上传成功')
    })
    uploader.on('close', (urls) => {
      uploader.destroy()
    })
  }
  public render () {
    return (
      <div>xxx</div>
    )
  }
}
