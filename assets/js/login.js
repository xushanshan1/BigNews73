$(function () {
  // 点击去注册切换到注册页面
  $('.login a').on('click', function () {
    $('.login').hide().next().show()
  })
  // 点击去登录切换到登录页面
  $('.register a').on('click', function () {
    $('.register').hide().prev().show()
  })

  var form = layui.form
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '用户名不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'"
      }
      // if(/^\d+\d+\d$/.test(value)){
      //   return '用户名不能全为数字';
      // }
    },
    repass: function (value, item) {
      // item是当前的确认密码框元素
      // value是当前确认密码框中输入的值
      // 2.1 获取密码框中的输入内容
      var passVal = $('.register .myForm input[name=password]').val()
      // 2.2 判断两次输入的密码是否相同
      if (passVal !== value) {
        // 2.3 清空密码框并添加提示
        $('.register .myForm .pass,.register .myForm .repass').val('')
        return '两次密码不一致,请重新输入'
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\d]{6,12}$/, '密码必须6到12位数字，且不能出现空格'],
  })

  // $('button').on('click',function(e){
  //   e.preventDefault()
  // })

  var BASE_URL = 'http://ajax.frontend.itheima.net'

  // $('.register myForm').on('submit', function (e) {
  //   e.preventDefault()
  //   $.ajax({
  //     type: 'post',
  //     url: BASE_URL + '/api/reguser',
  //     data: $(this).serialize(),
  //     success: function (info) {
  //       var layer = layui.layer
  //       layer.msg(info.message)
  //       // 4.5 如果注册成功 则跳转登陆界面
  //       if (info.status == 0) {
  //         $('.login').show().next().hide()
  //       }
  //     },
  //   })
  // })
})
