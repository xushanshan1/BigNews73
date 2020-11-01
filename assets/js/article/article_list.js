$(function () {
  // 1、发送ajax请求，获取文章分类的id
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      // console.log(res)
      if (res.status === 0) {
        var htmlStr = template('categoryList', res)
        // 1.1渲染到页面中
        $('#category').html(htmlStr)
        // 1.2动态创建的表格需要更新渲染---更新全部
        layui.form.render()
      }
    },
  })

  // 【提取数据】
  var params = {
    pagenum: 1, //页码值
    pagesize: 3, //每页显示多少条数据
    cate_id: $('#category').val(), //文章的分类id
    state: $('#state').val(), //文章的状态
  }

  // 2、获取文章分类列表功能
  renderList()
  function renderList() {
    // 2.1发送ajax请求
    $.ajax({
      type: 'get',
      url: '/my/article/list',
      data: params,
      success: function (res) {
        // console.log(res)
        // 2.2将模板存起来
        var htmlStr = template('addCategoryList', res)
        // 2.3渲染到页面中
        $('tbody').html(htmlStr)
        // 2.4启用分页功能
        renderPage(res)
      },
    })
  }

  // 3、筛选功能
  // 3.1 给表单注册submit事件，通过筛选按钮来触发 接口和获取文章分类列表一样
  $('.myForm').on('submit', function (e) {
    // 3.2阻止默认行为
    e.preventDefault()
    // 3.3 点击筛选按钮的时候，重新获取最新的 id 和 状态（筛选条件）
    params.cate_id = $('#category').val()
    params.state = $('#state').val()
    // 3.4发送ajax请求
    renderList()
  })

  // 4、分页功能
  function renderPage(res) {
    var laypage = layui.laypage
    //执行一个laypage实例
    laypage.render({
      elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
      count: res.total, //数据总数，从服务端得到
      limits: [2, 3, 5, 10], //每页条数的选择项--下拉选项
      limit: params.pagesize, // 当前每页显示的条数
      curr: params.pagenum, //当前页码值
      groups: 3, //连续出现的页码之
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, first) {
        // obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
        // console.log(obj.curr); //得到当前页码值
        // console.log(obj.limit); //得到每页显示的条数
        // console.log(first);//首次输出时true，后面都是undefined
        params.pagenum = obj.curr //得到当前页码值
        params.pagesize = obj.limit //得到每页显示的条数
        //首次不执行
        if (!first) {
          //do something
          renderList()
        }
      },
    })
  }

  // 5、删除功能
  // 【注】当前页面的分类列表项全部删除之后，会有一个bug，因为没有触发前一页的按钮，所以当前页码的列表是空的，页码也不会改变
  // 5.1给btn-del删除按钮 注册点击事件  事件委托-动态创建的
  $('body').on('click', '.btn-del', function () {
    // 5.6拿到当前页面的分类列表的数量 拿删除按键的数量
    var count = $('tbody .btn-del').length

    //  5.2 拿到当前按钮的id
    var listId = $(this).data('id')
    // 5.3弹出询问框
    layer.confirm('是否要删除此条文章?', { icon: 3, title: '提示' }, function (
      index
    ) {
      //do <something></something>
      // 5.4 发送ajax请求
      $.ajax({
        type: 'get',
        url: '/my/article/delete/' + listId,
        success: function (res) {
          layer.msg(res.message)
          if (res.status === 0) {
            // 5.5 确认删除重新渲染页面
            // 5.7 判断显示当前页还是上一页-----------------??
            if (count == 1) {
              params.pagenum = params.pagenum == 1 ? 1 : params.pagenum - 1
              // params.pagenum = 1 ? 1 : params.pagenum - 1
              // params.pagenum = params.pagenum - 1
            }
            renderList()
          }
        },
      })
      layer.close(index)
    })
  })
})
