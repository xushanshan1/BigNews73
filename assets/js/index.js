// 获取用户名和头像信息
$(function () {
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
