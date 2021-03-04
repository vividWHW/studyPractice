
//侧边栏弹出
toolbarFunc();
function toolbarFunc(){
    var oToolBar = document.querySelector('aside.toolBar');
    var oTop = document.querySelector('aside.toolBar .outside .top');
    //点击按钮时移动侧边栏
    oTop.onclick = function(){
        //t通过自定义的属性判断toolBar是否已经显示了
        if(oToolBar.dataset.show){
            oToolBar.style.right = '-300px';
            //去掉标记显示的自定义属性
            delete oToolBar.dataset.show;
        }else{
            oToolBar.style.right = '0px';
            //toolBar完全显示的时候添加一个自定义属性作为标记
            oToolBar.dataset.show = 'true';
        }
    }
}


//加载图片数据
getPicture();
function getPicture(){
    var oPreImg = document.querySelector('.con-main .preview-img .img-box');
    var oBigImg = document.querySelector('.con-main .preview-img .big-img');
    var oUl = document.querySelector('.con-main .preview-scroll ul');
    //小图列表
    goodData.imgsrc.forEach(function(item, index){
        var newLi = document.createElement('li');
        var newImg = new Image();
        newImg.src = item.s;
        newLi.appendChild(newImg);
        oUl.appendChild(newLi);
        //把第一张图片作为放大镜的大小两张图
        if(index == 0){
            var preImg = newImg.cloneNode();
            oPreImg.appendChild(preImg);
            //oBigImg中放的是大图
            var bigImg = newImg.cloneNode();
            bigImg.src = item.b;
            oBigImg.appendChild(bigImg);
        }
    });
}

//放大镜
imgPreview();
function imgPreview(){
    var oImgBox = document.querySelector('.con-main .preview-img');
    var oMask = document.querySelector('.con-main .preview-img .mask');
    var oBigBox = document.querySelector('.con-main .preview-img .big-img');
    var oBigImg = document.querySelector('.con-main .preview-img .big-img img');
    oImgBox.onmousemove = function(e){
        oMask.style.display = 'block';
        oBigBox.style.display = 'block';
        //计算蒙版应该在的位置
        var maskPosition = {
            left: e.clientX - oMask.offsetWidth/2 - oImgBox.getBoundingClientRect().left,
            top: e.clientY - oMask.offsetHeight/2 - oImgBox.getBoundingClientRect().top
        }
        //判断临界值
        if(maskPosition.left < 0){
            maskPosition.left = 0;
        }
        if(maskPosition.left > oImgBox.clientWidth - oMask.offsetWidth){
            maskPosition.left = oImgBox.clientWidth - oMask.offsetWidth;
        }
        if(maskPosition.top < 0){
            maskPosition.top = 0;
        }
        if(maskPosition.top > oImgBox.clientHeight - oMask.offsetHeight){
            maskPosition.top = oImgBox.clientHeight - oMask.offsetHeight;
        }

        //给蒙版的位置赋值
        oMask.style.left = maskPosition.left + 'px';
        oMask.style.top = maskPosition.top + 'px';

        //比例 = 蒙版可走的距离 / 大图可走的距离
        var scale = (oImgBox.clientWidth - oMask.offsetWidth) / (oBigImg.offsetWidth - oBigBox.clientWidth);
        //计算大图的位置
        var bigImgPosition = {
            left: maskPosition.left / scale,
            top: maskPosition.top / scale
        }
        //给大图的位置赋值
        //console.log(bigImgPosition)
        oBigImg.style.left = - bigImgPosition.left + 'px';
        oBigImg.style.top = - bigImgPosition.top + 'px';
        
    }
    oImgBox.onmouseleave = function(){
        oMask.style.display = 'none';
        oBigBox.style.display = 'none';
    }
}

//放大镜下面的图片列表
previewScroll();
function previewScroll(){
    var oLeft = document.querySelector('.con-main .preview-scroll .left');
    var oRight = document.querySelector('.con-main .preview-scroll .right');
    var oUl = document.querySelector('.con-main .preview-scroll ul');
    var oLis = document.querySelectorAll('.con-main .preview-scroll ul li');

    //ul的位置，初始为0
    var ulLocation = 0;
    //每次移动的距离，每次移动两个li
    var everyLocation = oLis[0].offsetWidth * 2;
    //总共可以移动的距离
    var totalLocation = (oLis.length - 5) * oLis[0].offsetWidth;
    //点击右侧按钮
    oRight.onclick = function(){
        //比较每次移动的距离和可移动的距离的大小
        if(ulLocation + everyLocation > totalLocation){
            ulLocation = totalLocation;
        }else{
            ulLocation += everyLocation;
        }
        console.log(oUl)
        oUl.style.transform = 'translateX('+ -ulLocation + 'px)';
    }
    //点击左侧按钮
    oLeft.onclick = function(){
        //判断每次移动的距离和可移动的距离的大小
        if(ulLocation - everyLocation < 0){
            ulLocation = 0;
        }else{
            ulLocation -= everyLocation;
        }
        oUl.style.transform = 'translateX(' + -ulLocation + 'px)';
    }
}

//点击放大镜下面的图片列表
clickPicList();
function clickPicList(){
    var oPreImg = document.querySelector('.con-main .preview-img .img-box');
    var oBigImg = document.querySelector('.con-main .preview-img .big-img');
    var oLis = document.querySelectorAll('.con-main .preview-scroll ul li');
    //遍历li，给每个li绑定点击事件
    oLis.forEach(function(item, index){
        item.onclick = function(){
            //把PreImg和BigImg换成当前点击的图片
            var preimg = new Image();
            preimg.src = goodData.imgsrc[index].s;
            oPreImg.replaceChild(preimg, oPreImg.childNodes[0]);
            var bigimg = new Image();
            bigimg.src = goodData.imgsrc[index].b;
            oBigImg.replaceChild(bigimg, oBigImg.childNodes[0]);
            //重新调用放大镜
            imgPreview();
        }
    });
}

//生成chooseArea的内容
chooseArea();
function chooseArea(){
    var oBox = document.querySelector('section.content .chooseArea');
    var chooseData = goodData.goodsDetail.crumbData;
    //便利chooseData，根据它的长度生成多少个dl
    chooseData.forEach(function(item, index){
        var newDl = document.createElement('dl');
        //生成当前dl中的dt并填入数据、插入dl
        var newDt = document.createElement('dt');
        newDt.textContent = item.title;
        newDl.appendChild(newDt);
        //遍历item中的data，生成dd
        item.data.forEach(function(item, index){
            var newDd = document.createElement('dd');
            newDd.textContent = item.type;
            //给dd添加一个自定义属性，保存它对应的对价格的改变
            newDd.dataset.price = item.changePrice;
            //给第一个dd添加样式
            if(index === 0){
                newDd.classList.add('active');
            }
            newDl.appendChild(newDd);
        });
        //将完整的dl插入oBox中
        oBox.appendChild(newDl);
    });
}


//点击chooseArea中的dd
//定义变量，准备将来声明为数组存放chooseArea中选中的标签，根据这个数组生成mark标签
var markArr = null;
chooseAreaClick();
function chooseAreaClick(){
    oDls = document.querySelectorAll('section.content .chooseArea dl');
    //根据dl的数量初始化markArr，生成有dl个数的empty的数组
    markArr = new Array(oDls.length);
    //遍历dls
    oDls.forEach(function(oDl, index){
        //获取当前dl中的dd
        var oDds = oDl.querySelectorAll('dd');
        //遍历当前dl中的所有dd，绑定点击事件
        oDds.forEach(function(oDd){
            oDd.onclick = function(){
                //清除当前dl下的所有dd的样式
                oDds.forEach(function(oDd){
                    oDd.classList.remove('active');
                });
                //给当前点击的dd添加样式
                this.classList.add('active');
                //把当前点击的dd添加进markArr中对应的位置，即外层forEach，ouls的index
                markArr[index] = this;
                //调用函数插入mark
                insertMark();
                //修改价格
                changePrice();
            }
        });
    });
}
//插入mark标签
function insertMark(){
    //获取存放mark标签的div
    var oChooseInsertBox = document.querySelector('.content .con-main .detail .chooseInsert');
    //在将mark标签插入div之前先把div中的清空
    oChooseInsertBox.innerHTML = '';
    //遍历markArr，根据markArr生成mark标签
    markArr.forEach(function(item, index){
        //如果是null则直接返回(empty不会被遍历出来)
        if(!item){
            return;
        }
        //生成mark标签
        var oMark = document.createElement('mark');
        oMark.textContent = item.textContent;
        //生成mark标签中的a标签并插入mark标签
        var oA = document.createElement('a');
        oA.href = 'javascript:;';
        oA.textContent = 'X';
        //给a标签添加一个自定义属性，保存它对应的dd在markArr中的index
        oA.dataset.index = index;
        oMark.appendChild(oA);
        //将mark标签插入div中
        oChooseInsertBox.appendChild(oMark);
        //给a标签绑定点击事件
        delMark();
    });
}

//点击已选中标签的‘X’取消选中
function delMark(){
    //获取所有mark标签中的a标签
    var oAs = document.querySelectorAll('.content .con-main .detail .chooseInsert mark a');
    //遍历oAs，给a标签绑定点击事件
    oAs.forEach(function(a){
        a.onclick = function(){ 
            //删除它的父元素，即整个mark标签
            a.parentElement.remove();
            //根据它的index属性，删除markArr中对应的dd
            markArr[a.dataset.index] = null;
            //根据index属性在获取的oDls中找的当前a对应的oDl下的所有dd
            var oDds = document.querySelectorAll('.content .con-main .detail .chooseArea dl')[a.dataset.index].querySelectorAll('dd');
            //遍历oDds，把所有dd的样式去掉
            oDds.forEach(function(dd){
                dd.classList.remove('active');
            });
            //再给第一个dd添加样式
            oDds[0].classList.add('active');
            //修改价格
            changePrice();
        }
    });
}

//修改价格
function changePrice(){
    //获取显示价格的元素
    var oPrice = document.querySelector('.con-main .detail-price .price span');
    //获取 商品详情-右侧-选择搭配 中显示价格的元素
    var oDetailPrice = document.querySelector('section.detail .good-detail .master p');
    //获取最初始的价格
    var price = goodData.goodsDetail.price;
    //获取要购买的件数
    var num = document.querySelector('.con-main .chooseNum .num input').value;
    //遍历markArr，即遍历选中的dd，计算单价
    markArr.forEach(function(dd){
        //dd不为null时
        if(dd){
            price += + dd.dataset.price;
        }
    });
    //将计算好的价格赋值给oPrice和oDetailPrice的内容
    oPrice.textContent = oDetailPrice.textContent = price * num;
}

//修改商品件数
changeNum();
function changeNum(){
    //显示数字的input
    var oNum = document.querySelector('.con-main .chooseNum .num input');
    //增加按钮
    var oPlus = document.querySelector('.con-main .chooseNum .num .plus');
    //减少按钮
    var oMins = document.querySelector('.con-main .chooseNum .num .mins');
    //点击增加按钮时
    oPlus.onclick = function(){
        oNum.value = + oNum.value + 1;
        //修改价格
        changePrice();
    }
    //点击减少按钮时
    oMins.onclick = function(){
        //判断是否小于等于1，小于1则不能再减小，直接返回
        if(oNum.value <= 1){
            return;
        }
        oNum.value = + oNum.value - 1;
        //修改价格
        changePrice();
    }
}

//修改选择搭配的价格
changeMatchPrice();
function changeMatchPrice(){
    //获取显示搭配的总价的span
    var oPrice = document.querySelector('.good-detail .good-match .list .result p.price span');
    //获取选择搭配-搭配的商品中的所有div
    oDivs = document.querySelectorAll('.good-detail .good-match .list div.match-good');
    //遍历divs，给每个div绑定点击事件
    oDivs.forEach(function(div){
        div.onclick = function(e){
            e.stopPropagation();
            //获取对应的input
            var oIpt = div.querySelector('input');
            //获取对应的价格
            var price = + div.querySelector('input').value;
            //判断input是否被选中
            if(oIpt.checked){
                //本来被选中的话改为不被选中且减去价格
                oIpt.checked = false;
                oPrice.textContent = +oPrice.textContent - price;
            }else{
                //本来未被选中的话改为选中且加上价格
                oIpt.checked = true;
                oPrice.textContent = +oPrice.textContent + price;
            }
            console.log(oPrice)
        }
    });
}

//面向对象tab选项卡
function Tab(oTitles, oCons){
    //保存this，这里的this指向Tab的实例化对象
    var _this = this;
    //把oTitles和oCons都保存到Tab的实例化对象上
    this.oTitles = oTitles;
    this.oCons = oCons;
    //遍历oTitles，给每个title绑定点击事件
    oTitles.forEach(function(title, index){
        title.onclick = function(){
            //调用Tab原型对象上的函数，把当前点击的title的index传给它
            _this.tabFunc(index);
        }
    });
}
//点击title执行的代码
Tab.prototype.tabFunc = function(index){
    //保存this，这里的this指向Tab的实例化对象
    var _this = this;
    //去掉所有title和con的样式（active）
    this.oTitles.forEach(function(title, index){
        title.classList.remove('active');
        _this.oCons[index].classList.remove('active');
    });
    //通过参数index给当前点击的title和con添加样式
    this.oTitles[index].classList.add('active');
    this.oCons[index].classList.add('active');
}
//tab选项卡
doTabs();
function doTabs(){
    //获取商品详情-左侧的tab
    var oTitles1 = document.querySelectorAll('aside.tab .tab-title span');
    var oCons1 = document.querySelectorAll('aside.tab .tab-content .tab-page');
    //实例化，添加tab效果
    new Tab(oTitles1, oCons1);
    
    //获取商品展示的tab
    var oTitles2 = document.querySelectorAll('.good-show .tab-title li');
    var oCons2 = document.querySelectorAll('.good-show .tab-content .tab-page');
    //实例化，添加tab效果
    new Tab(oTitles2, oCons2);
}

//动画回到顶部
backToTop();
function backToTop(){
    //获取回到顶部按钮
    var oBack = document.querySelector('aside.toolBar .outside .bottom');
    //绑定点击事件
    oBack.onclick = function(){
        //获取当前系统纵向滚动条的位置
        var nowScrollY = window.pageYOffset;
        //设置间歇调用计时器
        var timer = setInterval(function(){
            nowScrollY -= 80;
            //判断临界值
            if(nowScrollY <= 0){
                nowScrollY = 0;
                clearInterval(timer);
            }
            //设置滚动条位置
            window.scrollTo(window.pageXOffset, nowScrollY);
        }, 10);
    }
}