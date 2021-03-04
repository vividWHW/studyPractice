$(function(){
    //用一个数组保存todolist
    var todoList = [
        {
            content: '1'
        },{
            content: '2'
        },{
            content: '3'
        }
    ];
    //获取input
    var qIpt = $('#content')
    //获取ul
    var qUl = $('ul.todo');

    //点击add按钮时
    $('#add').click(function(e){
        //阻止默认事件，即表单提交
        e.preventDefault();
        //获取input的value
        var content = qIpt.val();
        //判断是否输入了内容，即content是否为空
        console.log(content.trim())
        if(!content.trim()){
            return;
        }
        //输入了内容则将content插入todoList中
        todoList.push({content: content});
        //生成新li
        var newLi = createLi(content);
        //插入ul
        qUl.append(newLi);
        newLi.slideDown(1000);
        //清空input
        qIpt.val('');
    });

    //点击delete时
    $('ul.todo').on('click', 'button', function(){
        deleteTodo($(this));
    })
    /* $('ul.todo').click(function(e){
        if(e.target.nodeName.toLowerCase() === 'a'){
            deleteTodo(e.target);
        }
    }); */

    //根据content生成li
    function createLi(content){
        //创建一个li
        var qLi = $('<li></li>');
        //创建一个span，并设置文本的内容为content,再把span插入li
        var qSpan = $('<span></span>');
        qSpan.text(content);
        qLi.append(qSpan);
        //创建一个删除按钮
        var qDel = $('<button>delete</button>');
        //把a插入li
        qLi.append(qDel);
        //把新li返回
        return qLi;
    }
    
    //初始化：根据todoList生成list
    createList();
    function createList(){
        //遍历todoList，根据文本内容创建新的li
        todoList.forEach(function(item, index){
            //调用生成li的函数
            var newLi = createLi(item.content, index);
            //把li插入ul
            qUl.append(newLi);
        });
    }

    //删除todo
    function deleteTodo(a){
        //删除它的元素
        a.parent().remove();
        //在数组中删除对应的数据

    }
});