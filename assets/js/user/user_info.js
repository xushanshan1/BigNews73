$(function () {
  // 发送ajax请求，获取用户的基本信息  渲染到页面中
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      //  form 不是一个对外暴露的
      // layui.form.val("myForm", res.data)

      // 将数据渲染到页面中
      layui.form.val('myForm', {
        //myForm 即 class="myForm" 所在元素属性 lay-filter="" 对应的值
        id: res.data.id,
        username: res.data.username,
        nickname: res.data.nickname,
        email: res.data.email,
      })
    },
  })

  // 验证表单的值
  layui.form.verify({
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









})
