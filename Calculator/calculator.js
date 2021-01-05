var flag = 0;
var fnum = 0, lnum = '';
var mark = 0;
function clearre() {
    console.log("clear");
    document.getElementById("result").innerHTML = "";
    flag = 0;
    fnum = 0;
    lnum = '';
    mark = 0;
}
function percent100() {
    var pinner = document.getElementById("result").innerHTML;
    if (isNaN(pinner)) document.getElementById("result").innerHTML = "ERROR";
    else
    {
        pinner = pinner * 100;
        document.getElementById("result").innerHTML = pinner;
        flag = 2;
        fnum = 0;
        lnum = '';
        mark = 0;
    }
    return;
}
function innum(num) {
    console.log("flag=%d",flag);
    var pinner = document.getElementById("result").innerHTML;
    if(pinner=='ERROR'){
        clearre();
        document.getElementById("result").innerHTML += num;
        return;
    }
    pinner = pinner + num;
    document.getElementById("result").innerHTML = pinner;
    if (flag == 1) {
        lnum = lnum + num;
        console.log("lnum=%s", lnum);
    }
    if(flag==2){
        clearre();
        document.getElementById("result").innerHTML += num;
    }
}
function operator(operatornum) {
    if(document.getElementById("result").innerHTML =='ERROR'){
        clearre();
        return;
    }
    if (flag == 0) {
        fnum = document.getElementById("result").innerHTML;
        mark = operatornum;
        switch (operatornum) {
            case 1: document.getElementById("result").innerHTML += '+'; break;
            case 2: document.getElementById("result").innerHTML += '-'; break;
            case 3: document.getElementById("result").innerHTML += 'x'; break;
            case 4: document.getElementById("result").innerHTML += '÷'; break;
        }
        flag = 1;
        console.log("fnum=%s,mark=%d", fnum, mark);
    }
    else {
        document.getElementById("result").innerHTML = "ERROR";
        flag = 0;
        fnum = 0;
        lnum = '';
        mark = 0;
    }
}
function cclt() {
    var num1 = num = 0;
    if (flag == 1) {
        // switch (mark) {
        //     case 1: num1 = parseFloat(fnum);
        //             num2 = parseFloat(lnum);
        //             document.getElementById("result").innerHTML = (num1 + num2).toFixed(10); 
        //             break;
        //     case 2: document.getElementById("result").innerHTML = (fnum - lnum).toFixed(10); break;
        //     case 3: document.getElementById("result").innerHTML = (fnum * lnum).toFixed(10); break;
        //     case 4: document.getElementById("result").innerHTML = (fnum / lnum).toFixed(10); break;
        // }
        switch (mark) {
            case 1: num1 = parseFloat(fnum);
                    num2 = parseFloat(lnum);
                    document.getElementById("result").innerHTML = (num1 * 1000 + num2 * 1000) / 1000; 
                    break;
            case 2: document.getElementById("result").innerHTML = ((fnum * 1000) - (lnum * 1000)) / 1000; break;
            case 3: document.getElementById("result").innerHTML = (fnum * 1000 * lnum ) / 1000; break;
            case 4: document.getElementById("result").innerHTML = (fnum * 1000 / lnum ) / 1000; break;
        }
        flag = 2;
        fnum = 0;
        lnum = '';
        mark = 0;
    }
    else{
        document.getElementById("result").innerHTML = "ERROR";
    }
}