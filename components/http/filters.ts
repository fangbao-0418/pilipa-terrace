const filters = {
  /** 过滤错误 */
  error: [
    '/v1/api/user/info\\?token=',
    '/v1/api/authority/code\\?token=',
    '/v1/api/user/company/list\\?token=',
    '/shop-pay/v2/api/pay/account/balance'
  ],
  /** 过滤loading  */
  loading: [
    '/notification/v1/api/remind/prompt/last/(\\w)+',
    '/notification/v1/api/remind/unread/(\\w)+',
    '/v1/api/makecall\\?customerId='
  ]
}
export default filters
