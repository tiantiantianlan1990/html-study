/**
 * Copyright (c) 2012 - 2013, Sohu Inc. All rights reserved.
 * @fileoverview Sohu �ռ�404ҳ�������ļ�
 * @author wangxin | xinwang200110@sohu-inc.com
 * @version 1.0 | 2014-2-18
 */
kao.add('index', {path:'http://js.tv.itc.cn/site/ugc/404/index.js',requires:['jquery']});
messagebus.subscribe('space.index', function(){
    kao('index');
});