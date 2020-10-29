// 校验密码
layui.form.verify({
  repass: function (value, item) {
    // item是当前的确认密码框元素
    // value是当前确认密码框中输入的值
    // 2.1 获取密码框中的输入内容
    var passValue = $(' .myForm input[name="newPwd"]').val()
    // 2.2 判断两次输入的密码是否相同
    if (value !== passValue) {
      // 2.3 清空密码框并添加提示
      $('.register .myForm .pass,.register .myForm .repass').val('')
      return '两次密码不一致,请重新输入'
    }
  },

  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\d]{6,12}$/, '密码必须6到12位数字，且不能出现空格'],
})

// 点击确认修改，发送ajax请求
$('.myForm').on('submit', function (e) {
  e.preventDefault()

  $.ajax({
    type: 'POST',
    url: '/my/updatepwd',
    data: $(this).serialize(),
    success: function (res) {
      console.log(res)

      layer.msg(res.message)
      if (res.status === 0 && res.message === '更新密码成功！') {
        $('.myForm')[0].reset()
      }
    },
  })
})

// 点击重置按钮，清空form表单
$('.reset').on('click', function (e) {
  e.preventDefault()
  $('.myForm')[0].reset()
})
