$(function () {
  // 获取分类列表
  renderTable()
  function renderTable() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res)
        if (res.status === 0) {
          // 使用模板引擎创建结构
          var htmlStr = template('categoryList', res)
          // 渲染到页面中
          $('tbody').html(htmlStr)
        }
      },
    })
  }

  $('.btn-add').on('click', function () {
    window.addIndex = layer.open({
      type: 1,
      area: '500px', //设置宽高
      title: '添加文章分类',
      content: $('#addForm').html(), //渲染到页面
    })
  })

  // 表单校验
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
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字'
      }
    },
  })

  // 添加分类列表
  // 1、给form注册submit事件  时间委托的方式
  $('body').on('submit', '.addForm', function (e) {
    e.preventDefault()
    // 发送新增文章分类的请求
    $.ajax({
      type: 'post',
      url: '/my/article/addcates',
      // 【注】 序列化方式获取表单数据，必要要严格按照接口设置表单中name的属性名
      data: $(this).serialize(),
      success: function (res) {
        if (res.status == 0) {
          // 添加成功后，让模态框隐藏
          layer.close(window.addIndex)
          // 添加成功后，重新渲染获取文章列表
          renderTable()
        }
      },
    })
  })

  // 删除分类列表
  // 1、给删除按钮注册点击事件  事件委托
  $('body').on('click', '.btn-del', function () {
    // 2、获取要删除的分列列表的id
    var listId = $(this).data('id')
    // 3、显示提示框 询问  是否真的要删除该分类
    layer.confirm(
      '是否真的要删除该分类?',
      { icon: 3, title: '提示' },
      function (index) {
        // 4、发送ajax请求
        $.ajax({
          type: 'GET',
          url: '/my/article/deletecate/' + listId,
          success: function (res) {
            console.log(res)
            if (res.status === 0) {
              // 提示
              layer.msg(res.message)
              //5、重新获取分类页面
              renderTable()
            }
          },
        })
        layer.close(index)
      }
    )
  })

  // 点击编辑按钮 数据回显在模态框中  根据id获取到当前这一项
  // 1、给编辑按钮注册点击事件 事件委托
  $('body').on('click', '.btn-edit', function () {
    var editId = $(this).data('id')
    // 2、弹框中要显示待编辑的数据
    $.ajax({
      type: 'GET',
      url: '/my/article/cates/' + editId,
      success: function (res) {
        console.log(res)
        if (res.status === 0) {
          // 3、获取成功的渲染数据到模态框中--layui中的表单赋值
          form.val('myForm', res.data)
          renderTable()
        }
      },
    })
    // 、弹出模态框 样式于增加列表时弹出的模态框基本类似
    window.editIndex = layer.open({
      type: 1,
      area: '500px', //设置宽高
      title: '更新文章分类',
      content: $('#editForm').html(), //渲染到页面
    })
  })

  // 点击确认修改按钮，进行文章数据分类更新
  // 1、给表单注册submit事件 事件委托
  $('body').on('submit', '.editForm', function (e) {
    e.preventDefault()
    // 2、发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status === 0) {
          // 3、成功后隐藏模态框
          layer.close(window.editIndex)
          // 4、成功后刷新文章分类列表
          renderTable()
        }
      },
    })
  })
})
