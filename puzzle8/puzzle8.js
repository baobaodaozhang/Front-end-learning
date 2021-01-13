var puzblk = 3;
var ran = [1, 2, 3, 4, 5, 6, 7, 8]
var eptblk = -1;
var divwd = $('#a').width();
var left = [];
var right = [];
var topp = [];
var bottom = [];
var mid = [];
var $divs;
var clknum = -1;
function randomorder(n) {//生成随机序列
    var j = 0;
    for (i = 9; i < n * n; i++) {
        var ran = [1, 2, 3, 4, 5, 6, 7, 8];
        ran.push(i);
        ran.length++;
        j++;
    }
    document.getElementById('pp').innerHTML = ran;
    document.getElementById('ppp').innerHTML = ran.length + "aa" + j;
    console.log(ran);
    return ran;
}

$('#reset').click(function () {//重置函数  添加n*n个div
    var num = document.getElementById("setnum").value;
    var num2 = num - 1 + 1;
    var ran = [];
    if (num == '') num2 = 3;
    console.log("num2:" + num2);
    console.log(typeof (num));
    console.log(typeof (num2));
    if (num2 < 10 && num2 >= 2) {
        puzblk = num2;
        var divs = "";
        $('#a').empty();
        for (var i = 0; i < num2 * num2; i++) {
            divs = divs + '<div></div>';
            ran.push(i);
        }
        $blk = $(divs);//加上n*n个div
        for (i = 0; i < ran.length; i++) {
            var random_index = Math.floor(Math.random() * ran.length);//产生一个在0到数组长度之间的随机数
            //经典的临时变量交换
            var t = ran[i];
            ran[i] = ran[random_index];
            ran[random_index] = t;
        }
        $('#a').append($blk);
        $('#a>div').css({
            'width': divwd / num2,
            'height': divwd / num2,
            'border': 'black 1px solid',
        });
        var bdpx = divwd + 2 * num2;
        bdpx = bdpx + 'px';
        $('#a').css({
            'height': bdpx,
            'width': bdpx,
        });
        $('#a>div').each(function (index, element) {
            if (ran[index]) {
                $(element).text(ran[index]);
                $(element).attr('class', 'numblk');
            }
            else {
                eptblk = index;
                $(element).attr('class', 'eptblk');
            }
        });
        $divs = $('#a>div');
        console.log("空格序号：" + eptblk);
    }
    else {
        alert("输入错误");
        return;
    }
});

$('#a').on('click', $('.numblk'), function (e) {
    var x = e.pageX
    var y = e.pageY;
    var atop = $('#a').offset().top;//'#a'据页面顶点的上、左边距
    var aleft = $('#a').offset().left;
    var divwd = $($divs[0]).width() + 2;//一个数字方块的宽、高
    var xn = Math.floor((x - aleft - 5) / divwd);
    var yn = Math.floor((y - atop - 5) / divwd);
    clknum = yn * puzblk + xn;
    console.log('clknum:', clknum);
    $.windowbox.move(clknum);
});

$(document).on('keydown', function (e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 38: clknum = eptblk + puzblk; break;//按上键
        case 40: clknum = eptblk - puzblk; break;//按下键
        case 37: clknum = eptblk + 1; break;//按左键
        case 39: clknum = eptblk - 1; break;//按右键
        case 82: $('#reset').trigger('click'); ; break;
        case 83: $('#submit').trigger('click'); ; break;
        default: break;
    }
    $.windowbox.move(clknum);
});

$.windowbox = {
    move: function (clknum) {
        var n = puzblk;
        var clkable = [];
        if (parseInt(eptblk / n)) clkable.push(eptblk - n);
        if (parseInt(eptblk / n) != n - 1) clkable.push(eptblk + n);
        if ((eptblk % n) != 0) clkable.push(eptblk - 1);
        if ((eptblk % n) != n - 1) clkable.push(eptblk + 1);
        console.log('可供点击clkable:', clkable);
        if (clkable.indexOf(clknum) != -1) {
            console.log('点击正确');
            t = $($divs[clknum]).text();
            $($divs[eptblk]).text(t);
            $($divs[clknum]).text('');
            $($divs[eptblk]).attr('class', 'numblk');
            $($divs[clknum]).attr('class', 'eptblk');
            eptblk = clknum;
        }
    }
}

$('#submit').click(function () {
    var t = -1;
    for (i = 0; i < puzblk * puzblk - 1; i++) {
        if (parseInt($($divs[i]).text()) > t) {
            t = parseInt($($divs[i]).text());
        }
        else {
            alert('解答错误！');
            return;
        }
    }
    alert('恭喜,解答正确！');
});

$('#reset').click();
