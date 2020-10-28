// 获取用户名和头像信息
$(function () {
  getUserinfo()

  function getUserinfo() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        console.log(res)
        // 登录成功之后
        if (res.status == 0) {
          // 设置左侧欢迎语
          $('.userInfo .welcome').html(
            `欢迎&nbsp;&nbsp;${
              res.data.nickname ? res.data.nickname : res.data.username
            }`
          )

          // 判断有没有设置头像
          if (!res.data.user_pic) {
            // 侧边栏和头部字体头像 判断有没有nikename呢称
            // 没有nickname
            if (!res.data.nickname) {
              $('.userInfo .text-avatar,.layui-header .text-avatar').text(
                res.data.username.slice(0, 1).toUpperCase()
              )
            } else {
              // 有nikename
              $('.userInfo .text-avatar,.layui-header .text-avatar').text(
                res.data.nikename.slice(0, 1).toUpperCase()
              )
            }
          } else {
            // 如果有头像，让字母头像隐藏，下一个兄弟img显示，并设置img的src地址为res.data.user_pic
            $('.userInfo .text-avatar,.layui-header .text-avatar')
              .hide()
              .next()
              .show()
              .attr('src', res.data.user_pic)
          }
        }
      },
      // 设置翻墙效果，如果退出index页面，会自动删除本地的token。做判断，如果没有token，需要重新登录
      // complete: function (res) {
      //   if(res.responseJSON.status == '1' && res.responseJSON.message == '身份认证失败！'){
      //     location.href = './login.html'
      //   }
      // },
    })
  }
  // 一个单独的js文件就是一个独立的作用域 不同作用域中的数据是不可以直接访问的
  // 为了让别的作用域能够使用当前使用域的数据，需要将当前作用域的数据向外导出或暴露
  // window是浏览器中的顶级对象，在各作用域中是可以直接访问的
  // 子页面可以调用父页面的方法和变量，所以将获取用户名和头像的函数存到变量中
  window.getUserinfo = getUserinfo

  // 点击退出按钮，退出index主页面，回到登录页面
  $('.tuichu').on('click', function () {
    layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (
      index
    ) {
      //do something
      // 删除本地存储的token
      localStorage.removeItem('token')
      // 跳转到login登录页面
      location.href = './login.html'
      // 隐藏当前的弹出层
      layer.close(index)
    })
  })
})
