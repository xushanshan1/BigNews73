$(function () {
  // 1. 启用富文本编辑器
  initEditor()

  // 2.发送ajax请求，获取文章分类的id
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      // console.log(res)
      if (res.status === 0) {
        var htmlStr = template('categoryList', res)
        // 2.1渲染到页面中
        $('#category').html(htmlStr)
        // 2.2动态创建的表格需要更新渲染---更新全部
        layui.form.render()
      }
    },
  })

  // 3、图片裁切效果
  // 3.1 找到要裁切的图片
  var $img = $('#image')
  // 3.3 配置选项
  const options = {
    aspectRatio: 400 / 280, //设置剪裁容器的比例
    preview: '.img-preview', // 预览的容器
  }
  // 3.4 渲染要裁切的图片，调用配置项
  $img.cropper(options)

  // 裁切图片的预览
  // 4.1 点击选择封面按钮，
  $('.btn-upload').on('click', function (e) {
    e.preventDefault()
    // 触发文件选择框单击事件
    $('#avatar').click()
  })

  // 5.给文件选择框avatat注册change事件。
  $('#avatar').on('change', function () {
    // 5.1获取待裁切的图片文件（用户选择的）
    var avatar = this.files[0]
    // 5.2创建(文件)大对象的二进制地址
    var imgUrl = URL.createObjectURL(avatar)
    // $img
    // .cropper('destroy')      // 销毁旧的裁剪区域
    // .attr('src', imgUrl)  // 重新设置图片路径
    // .cropper(options)        // 重新初始化裁剪区域
    // 5.3 销毁旧的裁剪去，重新设置新的路径并重新初始化
    $img.cropper('replace', imgUrl) //url：替换图片的URL重建cropper
  })

  // 6.文章发布效果  已发布 存草稿
  // 6.1 给两个按钮同时注册click事件
  $('.btn').on('click', function (e) {
    // 6.2 阻止默认行为
    e.preventDefault()

    // 6.3获取数据 FormData 拿到有name属性的数据
    var formData = new FormData($('.myForm')[0])

    // 6.4 判断哪个按钮被触发
    if ($(this).hasClass('btn-release')) {
      // 当前点击的是 发布按钮   给formData数据添加 发布状态的数据
      formData.append('state', '已发布')
    } else {
      // 当前点击的是存为草稿按钮  给formData数据添加 发布状态的数据
      formData.append('state', '草稿')
    }

    // 6.5 准备图片的二进制数据
    $img
      .cropper('getCroppedCanvas', {
        width: 400,
        height: 280,
      })
      .toBlob(function (blod) {
        // 有二进制数据了 添加到formData 中
        formData.append('cover_img', blod)
        // 将富文本编辑器的数据重新获取 添加到formData当中 原有的formData获取数据的方式获取不到content的内容，所有再另外获取一下
        formData.append('content', tinyMCE.activeEditor.getContent())
        // 6.6 发送ajax请求
        $.ajax({
          type: 'POST',
          url: '/my/article/add',
          data: formData,
          contentType: false, //不要添加请求头
          processData: false, //不要转换成查询字符串
          success: function (res) {
            // 6.7 提示用户
            layer.msg(res.message)
            // 6.8 判断
            if (res.status === 0) {
              location.href = './article_list.html'
            }
          },
        })
      })
  })
})
