/**
 * 消息服务
 */
import Service from '../../common/services/service'

class MessageService extends Service {
  // 删除
  public delListByIds (ids: any[] = []) {
    return Service.http(`/notification/v1/api/remind`, 'DELETE', {
      data: ids
    })
  }
  // 标记已读
  public readListByIds (ids: any[] = []) {
    return Service.http(`/notification/v1/api/remind/read`, 'PUT', {
      data: ids
    })
  }
  // 未读消息数
  public countUnreadedByUserid () {
    return Service.http(`/notification/v1/api/remind/unread`)
  }
  // 最新消息
  public getCurrentByUserid () {
    return Service.http(`/notification/v1/api/remind/prompt/last`)
    // .then(() => {
    //   return {
    //     title: 'xxx',
    //     content: 'xxxxxxxxx'
    //   }
    // })
  }
  // 详细详情
  public getItemById (id: any = '') {
    return Service.http(`/notification/v1/api/remind/${id}`)
  }
  // 消息列表
  public getListByUserid (createAt: any = '', pageCurrent: any = '1', pageSize: any = '10') {
    return Service.http(
      `/notification/v1/api/remind/page?` +
      `createAt=${createAt}&` +
      `pageCurrent=${pageCurrent}&` +
      `pageSize=${pageSize}`
    )
  }
}

export default new MessageService()
