$(function () {
  // 1. 实现裁切插件初始化
  // 由于后面我们会用到这个参数 所以呢将参数暂时先提取出来
  // 1.1 获取要裁切的图片
  $img = $('#image')
  // 1.2 准备参数
  var options = {
    aspectRatio: 1, // 裁切比例 纵横比
    // 设置预览的区域
    preview: '.img-preview',
  }

  // 1.3 调用方法实现插件初始化
  $img.cropper(options)

  // 点击上传按钮，触发file按钮，选择头像
  var $avatar = $('#avatar')

  $('.uploading').on('click', function () {
    $avatar.click()
  })

  // 给ipt标签注册chenge事件
  $avatar.on('change', function () {
    // 获取待裁切的图片文件（用户选择的）
    var avatar = this.files[0]

    // 创建(文件)大对象的二进制地址
    var imgUrl = URL.createObjectURL(avatar)
    // $img
    // .cropper('destroy')      // 销毁旧的裁剪区域
    // .attr('src', imgUrl)  // 重新设置图片路径
    // .cropper(options)        // 重新初始化裁剪区域

    $img.cropper('replace', imgUrl) //url：替换图片的URL重建cropper
  })

  // 点击确认按钮，发送ajax请求上传头像
  $('.tijiao').on('click', function () {
    // 获取bese64的格式的图片字符串 发送
    var DataUrl = $img
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100,
      })
      .toDataURL()

    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: DataUrl,
      },
      success: function (res) {
        // 提示上传结果
        layer.msg(res.message)
        if (res.status == 0) {
          // 调取index主页面的  获取用户头像和用户名的方法
          parent.window.getUserinfo()
        }
      },
    })
  })
})
