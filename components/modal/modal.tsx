import $ from 'jquery'
import React from 'react'
import { render } from 'react-dom'
export interface MyOptions {
  style?: string
  className?: string
  title?: string
  header?: any
  content?: any
  footer?: any
  onOk?: () => void
  onCancel?: () => void
  mask?: boolean
  maskClosable?: boolean
}
class Modal {
  public style: string
  public className: string
  public title: string = 'Modal'
  public header: any
  public content: any
  public footer: any
  public onOk: () => void
  public onCancel: () => void
  public mask: boolean = true
  public maskClosable: boolean = true
  public $el = $('<div />')
  public defaultCls = 'pilipa-modal'
  public pageX: number
  public pageY: number = 0
  public constructor (options: MyOptions = {}) {
    this.$el = $('<div />')
    this.style = options.style
    this.className = options.className
    this.title = options.title || this.title
    this.header = options.header
    this.content = options.content
    this.footer = options.footer
    this.onOk = options.onOk
    this.onCancel = options.onCancel
    this.mask = options.mask !== undefined ? options.mask : this.mask
    this.maskClosable = options.maskClosable !== undefined ? options.maskClosable : this.maskClosable
    this.$el.addClass(this.defaultCls)
    // $('body').on('click', (event) => {
    //   this.pageX = event.pageX
    //   this.pageY = event.pageY
    //   if (this.$el.find(event.target)) {
    //     this.pageX = undefined
    //     this.pageY = undefined
    //   }
    // })
  }
  public destroy () {
    this.$el.remove()
  }
  public initEvent () {
    this.$el.find('.pilipa-modal-close').unbind('click').click(() => {
      this.hide()
    })
    if (this.footer === undefined) {
      this.$el.find('.pilipa-modal-footer button').unbind('click').click((event) => {
        const index = $(event.target).index()
        if (index === 0) {
          this.hide()
          if (this.onCancel) {
            this.onCancel()
          }
        } else if (index === 1) {
          if (this.onOk) {
            this.onOk()
          }
        }
      })
    }
    const $mask = this.$el.find('.pilipa-modal-mask')
    $mask.off('click').on('click', (event) => {
      this.hide()
    })
  }
  public setTransformOrigin () {
    const offset = this.$el.find('.pilipa-modal-content').offset()
    const w = this.$el.find('.pilipa-modal-content').width()
    const h = this.$el.find('.pilipa-modal-content').height()
    let x = 0
    if (offset.left + w/2 > this.pageX) {
      x = offset.left - this.pageX
    } else {
      x = -(this.pageX - offset.left)
    }
    const y = offset.top - this.pageY
    this.$el.find('.pilipa-modal-content').css({
      transformOrigin: `${-x}px ${-y}px 0px`
    })
  }
  public show () {
    $('body').append(this.$el)
    this.$el.html(this.template())
    this.$el.find('.pilipa-modal-content').attr({
      style: this.style,
      class: ['pilipa-modal-content', this.className].join(' ')
    })
    if (!this.mask) {
      this.$el.find('.pilipa-modal-mask').css({
        'background-color': 'rgba(0,0,0,0)'
      })
    }
    this.setNode()
    this.setAnimation()
    this.initEvent()
  }
  public hide () {
    if ($('body').find(this.$el).length > 0) {
      this.$el.find('.pilipa-modal-mask').addClass('pilipa-fade-leave pilipa-fade-active')
      this.$el.find('.pilipa-modal-content').addClass('pilipa-zoom-leave pilipa-zoom-active')
      setTimeout(() => {
        this.$el.find('.pilipa-modal-mask').removeClass('pilipa-fade-leave pilipa-fade-active')
        this.$el.find('.pilipa-modal-content').removeClass('pilipa-zoom-leave pilipa-zoom-active')
        this.$el.remove()
      }, 200)
    }
  }
  public setAnimation () {
    this.$el.find('.pilipa-modal-mask').addClass('pilipa-fade-enter pilipa-fade-active')
    this.$el.find('.pilipa-modal-content').addClass('pilipa-zoom-enter pilipa-zoom-active')
    setTimeout(() => {
      this.$el.find('.pilipa-modal-mask').removeClass('pilipa-fade-enter pilipa-fade-active')
      this.$el.find('.pilipa-modal-content').removeClass('pilipa-zoom-enter pilipa-zoom-active')
    }, 200)
  }
  public setNode () {
    const nodes: any = {
      header: this.header,
      body: this.content,
      footer: this.footer
    }
    for (const key in nodes) {
      if (nodes[key] instanceof Object && nodes[key].$$typeof) {
        render(
          nodes[key],
          this.$el.find(`.pilipa-modal-${key}`)[0]
        )
      } else {
        if (nodes[key] === null) {
          this.$el.find(`.pilipa-modal-${key}`).remove()
        } else {
          this.$el.find(`.pilipa-modal-${key}`).html(nodes[key])
        }
      }
    }
  }
  public template () {
    return `
      <div class="${this.defaultCls}-wrap">
        <div class="${this.defaultCls}-mask"></div>
        <div class="${this.defaultCls}-content" style="">
          <div class="${this.defaultCls}-header">
            <span class="${this.defaultCls}-title">${this.title}</span>
            <span class="${this.defaultCls}-close">×</span>
          </div>
          <div class="${this.defaultCls}-body">xxx</div>
          <div class="${this.defaultCls}-footer">
            <button class="pilipa-btn pilipa-btn-default">取 消</button>
            <button class="pilipa-btn pilipa-btn-primary">确 定</button>
          </div>
        </div>
      </div>
    `
  }
}
export default Modal
