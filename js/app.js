angular.module("App",[]).directive('markdown',function () {
    var converter = new Showdown.converter();
    return{
        restrict : 'EAC',
        scope : {
            markdown:'@'  //@ 读取变量 = 读取值 & 一般用于调用函数
        },
        link:function (scope,element,attrs) {
          scope.$watch('markdown',function () {
             var content = converter.makeHtml(attrs.markdown);
             element.html(content);
          }) ;
        }
    }
})