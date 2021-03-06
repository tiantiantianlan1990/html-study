/**
 * Copyright (c) 2012 - 2013, Sohu Inc. All rights reserved.
 * @fileoverview Sohu 空间404页面功能文件
 * @author wangxin | xinwang200110@sohu-inc.com
 * @version 1.0 | 2014-2-18
 */
(function($){
    messagebus.subscribe('core.loaded_end', function(topic, data){

        function getName(string){
            //中文长度
            //bLength('凌晨三点五十分') === 14;
            function bLength(str){
                if (!str) {
                    return 0;
                }
                var aMatch = str.match(/[^\x00-\xff]/g);
                return (str.length + (!aMatch ? 0 : aMatch.length));
            };
            //中文截字
            //leftB('一小撮反动分子在天安门广场前...OOXX...',6) === '一小撮';
            function leftB(str, lens){
                var s = str.replace(/\*/g, ' ').replace(/[^\x00-\xff]/g, '**');
                str = str.slice(0, s.slice(0, lens).replace(/\*\*/g, ' ').replace(/\*/g, '').length);
                if (bLength(str) > lens && lens > 0) {
                    str = str.slice(0, str.length - 1);
                }
                return str;
            };
            return (bLength(string) > 56 ? leftB(string, 52) + '...' : string);
        }
        
        function getRandomData(arr, count){
            var _arr = [];
            for (var i = 0; i < count; i++) {
                var _random = Math.floor(Math.random() * arr.length);
                _arr.push(arr[_random]);
                arr.splice(_random, 1);
            }
            return _arr;
        }
        
        function addPingBack(){
            $('#content').delegate('a[node_type="more"]', 'click', function(e){
                sohuHD.pingback('http://click.hd.sohu.com.cn/s.gif?type=fun_breezetan_ugc404more&_=' + sohuHD.random());
            });
            $('#list').delegate('a[node_type="ping"]', 'click', function(e){
                sohuHD.pingback('http://click.hd.sohu.com.cn/s.gif?type=fun_breezetan_ugc404tj&_=' + sohuHD.random());
            });
        }
        
        var url = 'http://api.my.tv.sohu.com/wmrank/daily.do?count=100&vname=recommend_All_top100';
        var size = 5;
        sohuHD.getScript(url, function(){
            var data = getRandomData(recommend_All_top100.videos, 10);
            var arr = [];
            var space = 'http://my.tv.sohu.com/user/';
            $.each(data, function(index, data){
                var top = index + 1 > size ? '202px' : '0px';
                var left = index + 1 > size ? ((index - size) * 202) + 'px' : index * 202 + 'px';
                arr.push('<div class="box masonry-brick" style="position: absolute; top: ' + top + '; left: ' + left + ';">');
                arr.push('<div class="box-top"></div><div class="box-con">');
                arr.push('<a href="' + data.url + '" node_type="ping" class="pic" target="_blank" title="' + data.title + '"><img src="' + data.smallCover + '"></a>');
                arr.push('<strong><a href="' + data.url + '" node_type="ping" target="_blank" title="' + data.title + '">' + getName(data.title) + '</a></strong>');
                arr.push('<p><a href="' + data.url + '" node_type="ping" class="acount" target="_blank" title="' + data.title + '">' + sohuHD.formatCount(data.count) + '</a></p>');
                arr.push('<p><a class="ico-user" title="' + data.title + '" href="' + (space + data.userId) + '" target="_blank">' + data.userNickName + '</a></p></div><div class="box-bot"></div></div>');
            });
            $('#list').html(arr.join(''));
            kao('count', function(){
                sohuHD.count.getCountBy($('#list'), 'list', true);
            });
            addPingBack();
        });

    }, null, null, {cache:true});
})(jQuery)
