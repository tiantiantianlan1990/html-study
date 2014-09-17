sohuHD.autoScroll = function(){
    var opts = $.extend({               
                cont: ".cont",
                next: "#arrdown",
                disNext: "dN",
                prev: "#arrup",
                disPrev: "uN",
                oncenum:1,//一次滚动的个数
                num:0,//默认滚动到第0个
                pnum:5,//每页显示几个
                random:false,
                time:300,
                page: null,
                auto : false,
                trend : 'h'//h表示水平方向滚动v表示垂直方向滚动
            }, arguments[0]);           
    var cont = $( opts.cont );   
    var next = $( opts.next );   
    var prev = $( opts.prev );   
    var page = $( opts.page );  
    var auto = opts.auto;
    var total = cont.length;  
    var owr = opts.owr ? opts.owr : cont[1].offsetLeft - cont[0].offsetLeft,    
    idxArear = [0, total];  
    var num = opts.random ? (Math.floor(Math.random()*(total-opts.pnum+1))) : opts.num; 
    var num1= total - opts.pnum;
    function updateNum(n){
        if (n < 0) {
            updateNum (0);              
            return;
        } else if (total - n < opts.pnum) {         
            updateNum (num1);
            return;
        }   
        prev[((n == 0)?'add':'remove') + 'Class'](opts.disPrev);
        next[((n >= num1)?'add':'remove') + 'Class'](opts.disNext); 
        num = n;
        if (opts.trend == 'h') {
            var owr = cont[1].offsetLeft - cont[0].offsetLeft;
            cont.parent().stop().animate({left: -n * owr},opts.time);
        } else if(opts.trend == 'v') {
            var owr = opts.owr ? opts.owr : cont[1].offsetTop - cont[0].offsetTop;
            cont.parent().stop().animate({top: -n * owr},opts.time);
        }       
    }
    updateNum(num);                 
    prev.click(function(ev){
        updateNum(num - opts.oncenum);
        return false;
    });
    next.click(function(ev){
        if (auto && num == total - opts.pnum) {
            updateNum(0);
        } else {
            updateNum(num + opts.oncenum);
        }
                        
        return false;
    });
    var go; 
    if (auto) {
        //auto 支持boolean和int
        var gap = typeof auto == "boolean" ? 5000 : auto;
        go = setInterval(function(){
           next.click()
        }, gap);
        sohuHD.bind(cont, 'hover', function(){
            clearInterval(go);
        }, function(){
            go = setInterval(function(){
               next.click()
            }, gap);
        });
    }
};
sohuHD.loopScroll = function(){
    var opts = $.extend({   
                box : "#loopSbox",
                cont: ".cont",
                next: "#arrdown",
                disNext: "dN",
                prev: "#arrup",
                disPrev: "uN",
                oncenum:1,//一次滚动的个数
                num:0,//默认滚动到第0个
                pnum:5,//每页显示几个
                random:false,
                time:300,
                page: null,
                trend : 'h',
                auto : false
            }, arguments[0]);
    var box = $(opts.box);
    var cont = $( opts.cont );   
    var next = $( opts.next );   
    var prev = $( opts.prev );   
    var page = $( opts.page );  
    var auto = opts.auto;
    var total = cont.length; 
    var par = cont.parent();
    var lpar = par.next();
    lpar.append(cont.clone())
    var idxArear = [0, total];  
    var num = opts.random ? (Math.floor(Math.random()*(total-opts.pnum+1))) : opts.num; 
    var num1= total - opts.pnum;
    function updateNum(n,direction){
        var owr = opts.owr ? opts.owr : cont[1].offsetLeft - cont[0].offsetLeft;
        if (direction == 1) {
            if (n == 0) {
                box.append(lpar);               
                par.stop().animate({left: 0},opts.time);
                lpar.stop().animate({left: total * owr},opts.time);                             
                num = 0;
            } else if (n == total) {
                par.stop().animate({left: -n * owr},opts.time);
                lpar.stop().animate({left: (total- n) * owr},opts.time);
                setTimeout(function() {
                    par.css({"left":total * owr+'px'});
                    lpar.css({"left":0});
                    var opar = par;         
                    par = lpar; 
                    lpar = opar;            
                    box.append(opar);               
                    num = 0;
                },opts.time);
            } else if (n < 0){
                lpar.stop().animate({left: -(total + n) * owr},opts.time);
                par.stop().animate({left:-n * owr},opts.time);  
                num = n;
            } else if (n > 0) {
                par.stop().animate({left: -n * owr},opts.time);
                lpar.stop().animate({left: (total- n) * owr},opts.time);    
                num = n;
            }       
        } else if(direction == 0) {
            if (n == -1 || n == 0) {    
                box.prepend(lpar);
                lpar.stop().animate({left: -(total + n) * owr},opts.time);
                par.stop().animate({left:-n * owr},opts.time);  
                num = n;
            } else if (n == -total) {
                lpar.stop().animate({left: -(total + n) * owr},opts.time);
                par.stop().animate({left:-n * owr},opts.time);  
                setTimeout(function(){
                    var opar = par;
                    par = lpar;
                    lpar = opar;
                    par.css({left:0});
                    lpar.css({left:-total * owr});
                    num = 0;
                },opts.time);
            } else if (n <0){
                lpar.stop().animate({left: -(total + n) * owr},opts.time);
                par.stop().animate({left:-n * owr},opts.time);  
                num = n;
            } else if (n > 0) {
                par.stop().animate({left: -n * owr},opts.time);
                lpar.stop().animate({left: (total- n) * owr},opts.time);    
                num = n;
            }       
        }       
    }
    
    function updateNumV(n,direction) {
        var owr = opts.owr ? opts.owr : cont[1].offsetTop - cont[0].offsetTop;  
        if (direction == 1) {
            if (n == 0) {
                box.append(lpar);               
                par.stop().animate({top: 0},opts.time);
                lpar.stop().animate({top: total * owr},opts.time);                              
                num = 0;
            } else if (n == total) {
                par.stop().animate({top: -n * owr},opts.time);
                lpar.stop().animate({top: (total- n) * owr},opts.time);
                setTimeout(function() {
                    par.css({"top":total * owr+'px'});
                    lpar.css({"top":0});
                    var opar = par;         
                    par = lpar; 
                    lpar = opar;            
                    box.append(opar);               
                    num = 0;
                },opts.time);
            } else if (n < 0){
                lpar.stop().animate({top: -(total + n) * owr},opts.time);
                par.stop().animate({top:-n * owr},opts.time);   
                num = n;
            } else if (n > 0) {
                par.stop().animate({top: -n * owr},opts.time);
                lpar.stop().animate({top: (total- n) * owr},opts.time); 
                num = n;
            }       
        } else if(direction == 0) {
            if (n == -1 || n == 0) {    
                box.prepend(lpar);
                lpar.stop().animate({top: -(total + n) * owr},opts.time);
                par.stop().animate({top:-n * owr},opts.time);   
                num = n;
            } else if (n == -total) {
                lpar.stop().animate({top: -(total + n) * owr},opts.time);
                par.stop().animate({top:-n * owr},opts.time);   
                setTimeout(function(){
                    var opar = par;
                    par = lpar;
                    lpar = opar;
                    par.css({top:0});
                    lpar.css({top:-total * owr});
                    num = 0;
                },opts.time);
            } else if (n <0){
                lpar.stop().animate({top: -(total + n) * owr},opts.time);
                par.stop().animate({top:-n * owr},opts.time);   
                num = n;
            } else if (n > 0) {
                par.stop().animate({top: -n * owr},opts.time);
                lpar.stop().animate({top: (total- n) * owr},opts.time); 
                num = n;
            }       
        }
    }
    if (opts.trend == 'h') {
        updateNum(num,1);
    } else if (opts.trend == 'v'){
        updateNumV(num,1);
    }
                        
    prev.click(function(ev){
        if (opts.trend == 'h') {
            updateNum(num - opts.oncenum, 0);
        } else if (opts.trend == 'v'){
            updateNumV(num - opts.oncenum, 0);
        }       
        return false;
    });
    next.click(function(ev){
        if (opts.trend == 'h') {
            updateNum(num + opts.oncenum, 1);
        } else if (opts.trend == 'v'){
            updateNumV(num + opts.oncenum, 1);
        }                       
        return false;
    }); 
    if (auto) {
        //auto 支持boolean和int
        var gap = typeof auto == "boolean" ? 5000 : auto;
        go = setInterval(function(){
           next.click()
        }, gap);
        sohuHD.bind(cont, 'hover', function(){
            clearInterval(go);
        }, function(){
            go = setInterval(function(){
               next.click()
            }, gap);
        });
    }
};
function winPrize(data){//中奖
    if(data.status==5){
        //alert("没中奖")
        //$("#noticket").show();
        //$("#success").hide();
        $("#success").show();
    }
    if(data.status==6){
        $("#success").show();
        $("#noticket").hide();
         
    }
    if(data.status==7){
        alert("活动尚未开始！");
    }
    if(data.status==3){
        alert("活动已结束！");
    }
    if(data.status==1){
        alert("用户ID非法，不能参与！");
    }
};
function sucWin(data){//手机号提交
    
    if(data.status==6){
       // alert("b")
        $("#hasticket").show();
        $("#success").hide();
        $("#noticket").hide();
    }
}

$(function(){
    sohuHD.autoScroll({
                box : '#sortFocus'
                ,cont : '#tab_con li'
                ,next : '.arwR'
                ,prev : '.arwL'
                ,pnum:2
            });
    // sohuHD.autoScroll({
    //             box : '#picPiao'
    //             ,cont : '#div_picPiao li'
    //             ,next : '.arwRRR'
    //             ,prev : '.arwLLL'
    //             ,pnum:1
    //         });
   sohuHD.loopScroll({
                box:'#tab_con2'
                ,cont : '.pictureFocus li'
                ,next : '.arwRR'
                ,prev : '.arwLL'
                ,pnum:2
                ,auto : true
                ,oncenum : 1//一次滚动的个数
                ,num : 0//默认滚动到第0个
            });
   kao('count',function(){
        sohuHD.count.getCountBy($("#episodeList"),"episodeList");
    });
   $("#sub_button").click(function(){
    sohuHD.getScript('http://store.tv.sohu.com/web/vipbdaward/zdfgamble.do?bd_id=27&encoding=GBK&callback=winPrize');
    return false;
   });
    $(".close").click(function(){
      $("#hasticket").hide();
    });
  $("#sucbtn").click(function() {
    // alert("a");
    var tel=$("#telval").val();
    sohuHD.getScript('http://store.tv.sohu.com/web/vipbdaward/sendZdfCode.do?bd_id=27&aid=68&mobile='+tel+'&encoding=GBK&callback=sucWin');
   });

})