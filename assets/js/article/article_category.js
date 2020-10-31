$(function(){

$.ajax({
  type:'GET',
  url:'/my/article/cates',
  success:function(res){
    console.log(res);
    if( res.status === 0 ){
      var htmlStr = template('categoryList',res)
      $('tbody').html(htmlStr)
    }

  }

})




})