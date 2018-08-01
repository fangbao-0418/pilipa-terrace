import React from 'react'
import Modal from '../modal'
import bus, { Bus } from './bus'
import WebUploader from './index'
export interface Options {
  accept?: string
  accessKeyId: string
  accessKeySecret: string
  stsToken: string
  bucket: string
  region: string
  dir: string
  maxUploadNum?: number
  maskClosable?: boolean
  uploadTarget?: string
  mark?: string
  callback?: {}
  beforeUpdate?: (arr: Array<{name: string, hash: string}>) => any
}

let modal: Modal = null
// events: complete 完成, close 关闭
export default class extends Bus {
  constructor (opts: Options) {
    super()
    modal = new Modal({
      header: null,
      footer: null,
      mask: false,
      maskClosable: opts.maskClosable !== undefined ? opts.maskClosable : false,
      className: 'pilipa-web-uploader-modal',
      style: 'width: auto;',
      content: (
        <WebUploader
          accessKeyId={opts.accessKeyId}
          accessKeySecret={opts.accessKeySecret}
          stsToken={opts.stsToken}
          bucket={opts.bucket}
          region={opts.region}
          dir={opts.dir}
          accept={opts.accept}
          maxUploadNum={opts.maxUploadNum}
          uploadTarget={opts.uploadTarget}
          mark={opts.mark}
          beforeUpdate={opts.beforeUpdate}
          callBack={opts.callback}
        />
      )
    })
    modal.show()
  }
  public destroy () {
    bus.off()
    modal.hide()
  }
}
