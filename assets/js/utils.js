$.ajaxPrefilter(function (options) {
  // console.log(options)
  // 设置公用根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  // 统一设置token
  // 判断option的url中是否携带 /my  如果有 就需要设置token
  if (options.url.includes('/my')) {
    options.headers = { Authorization: localStorage.getItem('token') }
  }
})
