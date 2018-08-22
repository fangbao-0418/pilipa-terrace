import $ from 'jquery'
import React from 'react'
import { webUploader } from '../components'
/* tslint:disable:max-line-length quotemark */
const ossCfg: any = JSON.parse('{"credentials":{"securityToken":"CAISwAJ1q6Ft5B2yfSjIr4vxHIyFmZIVx6zcVxLEoW8lP+VrlYv6hjz2IH5Je3NgBOgdtfo+m2xX6P8alrhrSptEXUXzNJYrss4Nr1P6PdJUNEFkVvhW5qe+EE2/VjQTta27OpfqLr70fvOqdCqL9Etayqf7cjOPRkGsNYbz57dsctUQWHvfD19BH8wEHhZ+j8UYOHDNT9fPVCTnmW3NFkFllxNhgGdkk8SFz9ab9wDVgS+/qKwcrJ+jJYO/PYs+fsVnUtO0xOUzc66G2SFd7QQRs/sr1/cDo2+e7pTFUx4TwW3faLeLo4YxdVAmPfdgQvIblpWmy60k4N60vp/s1hNAMdtSVyniX426yKPGYrj3a4ljJeujYC+Tg4/Taces6xlVZmkAcRtLf9s5Izp1DVkiVzXeb6as813ReRc4lCtWKijquxqAATJI2YWV19/cvUUn7EzOBXfLo+X8jQdG4BqzrDklwYNB5tlCpgMyWCuI5XzOA+PuquisJpaUM+U+SpM0dIRSYh5LltMosOTNw2zxS3xqozdFigWXH8eB6zlM5DXg2yoKLSe0p3UVKa/NdLIyYRPpNgLa4/Rrl6rt5m7QTZd8zab4","accessKeySecret":"ASNF9ha3BVAwdYyEcGCA9RCKiiaTsgiMws4XpUSAQhjo","accessKeyId":"STS.NHDW61tM4pn7U4uEop3jGzNQd","expiration":"2018-08-14T06:57:16Z"},"endpoint":"oss-cn-beijing.aliyuncs.com","bucket":"pilipa-ml","roleSessionName":"pilipa_1534226836","pathPrefix":"agent3/4533/2018-08"}')
console.log(ossCfg)
const newOssCfg = JSON.parse('{"credentials":{"securityToken":"CAISvgJ1q6Ft5B2yfSjIr4mNfdD31b5g9pGgSkSGtUIMdr4ZpYaehDz2IH5Je3NgBOgdtfo+m2xX6P8alrhrSptEXUXzNJYrss0Nrl75M9JHehNXVvhW5qe+EE2/VjTsvqaLEfebIfrZfvCyER+m8gZ43br9cxi7QlWhKufnoJV7b9MRLG7aCD1dH4VuOxdFos0XPmerFZTLCBPxhXfKB0dFoxd1jXgFiZ6y2cqB8BHT/hmYiOYevNb2OYP2LZsubo9+V9at1alzcu3I3yNW90MNpfssy/YcoGeC5oHaQXspuk7bbLuPrIQwc1QmPPFmRJQp9qasyadK3cXIjJnyxhp3OuVYbj/SXojIwrGfRr72bIZkLe2gZSWSjo/Rb8HvwgQ/ejcDNQdLY9NkL3s1BwEoTnTTIaSq40va+dggmFIMDMsagAGGgJOpHdLzbgclgwu0l2JL0XChzv7xvGb/1KsMD/NTmSe56N0a+1lZizngd44lQtimeADTkaqBspolH/bbeppTsjmRIzWEQuoXGvFSJQyGQnG5df8dL2jwzEYIqhiF2U89lonEgQZnawuCxeqAxp4a0EO5eI4SxTQfGXycD5Tumg==","accessKeySecret":"FEyPk4qDZFo7VGePPxHBDhroUSiEHHd93kx88QVPeMik","accessKeyId":"STS.NJ86jC8aAASKHb7QBYz15JC5f","expiration":"2018-08-13T03:21:49Z"},"endpoint":"oss-cn-beijing.aliyuncs.com","bucket":"pilipa-ml","roleSessionName":"pilipa_1534127508","pathPrefix":"agent3/942/2018-08"}')

export default class extends React.Component {
  public componentDidMount () {
    const uploader = new webUploader({
      accessKeyId: ossCfg.credentials.accessKeyId,
      accessKeySecret: ossCfg.credentials.accessKeySecret,
      stsToken: ossCfg.credentials.securityToken,
      bucket: ossCfg.bucket,
      region: 'oss-cn-beijing',
      dir: ossCfg.pathPrefix,
      accept: ossCfg.accept,
      uploadTarget: '票据',
      maskClosable: true,
      // maxUploadNum: 19,
      mark: '西藏山峰广告装饰有限公司',
      beforeUpdate: (item: any) => {
        console.log(item)
        return $.ajax({
          url: '/api/note/duplicates-checking',
          method: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(item)
        })
      },
      callback: {
        url: "https://x-agent3.i-counting.cn/incoming/callback/oss",
        host: "x-agent3.i-counting.cn",
        body: 'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}' +
        '&width=${imageInfo.width}&receiptid=0&typeid=1&' +
        `&self=0&companycode=4533&relateDate=2018-08&version=3` +
        `&userid=ceshiid&nickname=ceshi&agency=agency1` +
        '&originalfile=${file.name}',
        contentType: 'application/x-www-form-urlencoded'
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
      // uploader.trigger('oss-update', {
      //   accessKeyId: newOssCfg.AccessKeyId,
      //   accessKeySecret: newOssCfg.AccessKeySecret,
      //   stsToken: newOssCfg.SecurityToken,
      //   bucket: newOssCfg.bucketName,
      //   region: 'oss-beijing',
      //   dir: newOssCfg.dir
      // })
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
