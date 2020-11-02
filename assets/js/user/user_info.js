$(function () {
  var form = layui.form

  // 发送ajax请求，获取用户的基本信息  渲染到页面中
  getUserData()
  function getUserData() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        //  form 不是一个对外暴露的
        // layui.form.val("myForm", res.data)

        // 将数据渲染到页面中
        form.val('myForm', {
          //myForm 即 class="myForm" 所在元素属性 lay-filter="" 对应的值
          id: res.data.id,
          username: res.data.username,
          nickname: res.data.nickname,
          email: res.data.email,
        })
      },
    })
  }

  // 验证表单的值
  form.verify({
    nickname: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '昵称不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "昵称首尾不能出现下划线'_'"
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '昵称不能全为数字'
      }
    },
  })

  // 给form表单注册submit事件  更新用户的基本信息
  $('.myForm').on('submit', function (e) {
    e.preventDefault()
    // 发送ajax请求更新用户的基本信息
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        layer.msg(res.message)
        if (res.status === 0) {
          // window.parent相当于是定位到父页面， 之后的操作和在父页面中写代码一样写
          //     window.parent.父页面方法名()
          //     window.parent.父页面变量名()
          // window.parent.window.getUserinfo()
          parent.getUserinfo() //简写
        }
      },
    })
  })

  // 基本资料页数据重置
  $('.reset').on('click', function (e) {
    e.preventDefault()
    getUserData()
  })
})
