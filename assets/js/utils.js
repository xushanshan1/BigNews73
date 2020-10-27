$.ajaxPrefilter(function (options) {
  console.log(options)
  // 设置公用根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
})
