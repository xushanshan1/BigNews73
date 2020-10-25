$(function () {
  // 点击去注册切换到注册页面
  $('.login a').on('click', function () {
    $('.login').hide().next().show()
  })
  // 点击去登录切换到登录页面
  $('.register a').on('click', function () {
    $('.register').hide().prev().show()
  })



})
