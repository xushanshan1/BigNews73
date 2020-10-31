$(function () {
  // 直接发送ajax请求，获取文章分类列表
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      console.log(res)
      if (res.status === 0) {
        // 使用模板引擎创建结构
        var htmlStr = template('categoryList', res)
        // 渲染到页面中
        $('tbody').html(htmlStr)
      }
    },
  })

  $('.btn-add').on('click', function () {
    layer.open({
      type:1,
      area: '500px',//设置宽高
      title: '添加文章分类',
      content:  $('#addForm').html()//渲染到页面
    });     
      
  })

  // 表单校验
var form = layui.form
  form.verify({
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
      if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        return '用户名不能有特殊字符';
      }
      if(/(^\_)|(\__)|(\_+$)/.test(value)){
        return '用户名首尾不能出现下划线\'_\'';
      }
      if(/^\d+\d+\d$/.test(value)){
        return '用户名不能全为数字';
      }
    }
  });  




})
