// 获取用户名和头像信息
$(function () {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgyMjksInVzZXJuYW1lIjoieHNzMTIzIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2MDM3NjQ0NjcsImV4cCI6MTYwMzgwMDQ2N30._u1bqLubgH_yrQO6cZWUWNQgcg5u7S-i7DbUD2idnuM',
    },
    success: function (res) {
      console.log(res)
      // 登录成功之后
      if (res.status == 0) {
        // 左侧欢迎语
        $('.userInfo .welcome').html(
          `欢迎&nbsp;&nbsp;${
            res.data.nickname ? res.data.nickname : res.data.username
          }`
        )
        //  判断用户头像
        // if (!res.data.user_pic) {
        //   // 判断侧边栏头像
        //   $('.userInfo .layui-nav-img').show().attr('src', res.data.user_pic)
        //   // 头部头像
        //   $('.layui-header .layui-nav-img')
        //     .show()
        //     .attr('src', res.data.user_pic)
        // } else {
        //   // 侧边栏字体头像
        //   $('.userInfo .text-avatar').text(
        //     res.data.username.slice(0, 1).toUpperCase()
        //   )
        //   $('.layui-header .text-avatar').text(
        //     res.data.username.slice(0, 1).toUpperCase()
        //   )
        // }
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
          $('.userInfo .text-avatar,.layui-header .text-avatar').hide().next().show().attr('src', res.data.user_pic)
         
        }
      }
    },
  })
})
