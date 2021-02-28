
//加载图片数据
getPicture();
function getPicture(){
    var oPreImg = document.querySelectorAll('con-main .preview-img')
    //var oBigImg = document.querySelector('.con-main .preview-img .big-img img');
    var oUl = document.querySelector('.con-main .preview-scroll ul');
    //小图列表
    goodData.imgsrc.forEach(function(item, index){
        var newLi = document.createElement('li');
        var newImg = new Image();
        newImg.src = item.s;
        newLi.appendChild(newImg);
        oUl.appendChild(newLi);
        if(index == 0){
            oPreImg.appendChild(newImg);
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