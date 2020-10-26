$(function () {
  // 设置公用跟路径
  $.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url
  })
})
