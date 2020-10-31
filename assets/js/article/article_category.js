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
})
