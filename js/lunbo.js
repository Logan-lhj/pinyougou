window.addEventListener('load', function () { 
    //获取两侧按钮
    var arrow_1 = document.querySelector('.arrow1');
    var arrow_2 = document.querySelector('.arrow2');
    var focus = document.querySelector('.focus');
    var circle = 0;//控制小圆点
    var picWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () { 
        arrow_1.style.display = 'block';
        arrow_2.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () { 
        arrow_1.style.display = 'none';
        arrow_2.style.display = 'none';
        timer = setInterval(() => arrow_2.click(), 1500);
    })
    //动态键入圆点
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (let index = 0; index < ul.children.length; index++) {
        var li = document.createElement('li');
        //记录当前索引
        li.setAttribute('index', index);
        ol.appendChild(li);
        li.addEventListener('click', function () { 
            for (let index = 0; index < ol.children.length; index++) {
                ol.children[index].className = '';
            }

            this.className = "current";
            var index = this.getAttribute('index');
            console.log(index);
            num=circle = index;
            slowanimate(ul,-index*picWidth);
        });
    }
    ol.children[0].className = "current";
    var lisWidth = ol.offsetWidth;
    var left = picWidth / 2 - lisWidth / 2;
    ol.style.left = left + 'px';
    //克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first)
    var num = 0;
    //节流阈
    var flag = true;
    //点击按钮滚动
    arrow_2.addEventListener('click', function () { 
        if (flag) { 
            flag = false;
            if (num == ul.children.length-1) { 
                ul.style.left = 0;
                num = 0;
            }
            num++;
            slowanimate(ul, -num * picWidth,()=>flag=true);
            //单击圆点，圆圈跟随变化
            circle++;
            if (circle == ul.children.length-1) { 
                circle = 0;
            }
            for (let index = 0; index < ol.children.length; index++) {
                ol.children[index].className = '';
            }
            ol.children[circle].className = "current";
        }
        //如果走到最后复制的一张，要快速跳到第一张
        
    })
    

    arrow_1.addEventListener('click', function () { 
        if (flag) { 
            flag = false;
            //如果走到最后复制的一张，要快速跳到第一张
        if (num == 0) { 
            num = ul.children.length-1;
            ul.style.left = (num)*picWidth+'px';
        }
        num--;
        slowanimate(ul, -num * picWidth,()=>flag=true);
        //单击圆点，圆圈跟随变化
        circle--;
        if (circle == -1) { 
            circle = ol.children.length-1;
        }
        for (let index = 0; index < ol.children.length; index++) {
            ol.children[index].className = '';
        }
        ol.children[circle].className = "current";
        }
    })


    //自动播放
    var timer = setInterval(() => arrow_2.click(), 1500);

 })