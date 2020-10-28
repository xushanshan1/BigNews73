$.ajaxPrefilter(function (options) {
  // console.log(options)
  // 设置公用根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  // 统一设置token
  // 判断option的url中是否携带 /my  如果有 就需要设置token
  if (options.url.includes('/my')) {
    options.headers = { Authorization: localStorage.getItem('token') }
  }

  // 统一设置 防翻墙
  options.complete = function (res) {
    if (
      res.responseJSON.status == '1' &&
      res.responseJSON.message == '身份认证失败！'
    ) {
      location.href = './login.html'
    }
  }
})
