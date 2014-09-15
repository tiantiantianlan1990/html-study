
    (function($)
    {	
        /**********************************************************************/

        var Geneva=function(geneva,page)
        {
            /******************************************************************/

            var $this=this;

            this.geneva=$(geneva);
            
            this.genevaListMenu=$('#geneva-list-menu');
            this.genevaListMenuElement=$('#geneva-list-menu li');
            
            this.genevaBoxMenu=$('#geneva-box-menu');
            this.genevaBoxMenuElement=$('#geneva-box-menu li');
            
            this.genevaCloseButton=$('.geneva-close-button');
            
            this.genevaPage=$('#geneva-page');
            this.genevaWindow=$('#geneva-window');
            
            this.genevaBoxMenuElementWidth=parseInt(this.genevaBoxMenuElement.css('width'));
            this.genevaBoxMenuElementHeight=parseInt(this.genevaBoxMenuElement.css('height'));

            this.genevaBoxMenuElementMargin=10;
            this.genevaBoxMenuElementWidth=parseInt($('#geneva-box-menu li').css('width'));

            this.genevaWidth=parseInt(this.geneva.css('width'));

            this.page=page;

            this.currentHash='';
            this.previousHash='#/main';

            this.currentPage=-1;
            this.previousPage=-1;
            
            this.scrollbar='';

            /******************************************************************/
            /******************************************************************/

            this.load=function()
            {
                var i=0;
                $this.genevaBoxMenuElement.each(function() 
                {
                    var url=$(this).css('background-image').replace(/^url|"|\(|\)/ig,'');
                    var image=$(document.createElement('img')).attr('src',url+($.browser.msie ? '?i='+getRandom(1,10000) : ''));
           		
                    $(image).bind('load',function() 
                    {
                        if((++i)==$this.genevaBoxMenuElement.length)
                        {
                            $this.genevaBoxMenu.hover(
                            
                                function() 
                                {
                                    $(this).children('li').animate({opacity:0.8},500);
                                },
                                function() 
                                {
                                    $(this).children('li').animate({opacity:1},500);
                                }
                            );
                                
                            $this.geneva.children('.preloader').remove();
                            $this.genevaBoxMenuElement.css('display','block');
                            $this.expand({onComplete:function() { $this.enable=true; $this.handleHash(); }});
                        };			
                    });
                });               
            };
            
            /******************************************************************/
            /******************************************************************/
            
            this.handleHash=function()
            {
                if(window.location.hash=='') window.location.href='#/main';

                if(($.browser.msie) && (parseInt($.browser.version)<=7)) 	
                { 
                    window.setInterval(function() 
                    {
                        if($this.isEnable()==false) return; 
                        
                        $this.currentHash=window.location.hash;
                        if($this.currentHash!=$this.previousHash) 
                        {
                            $this.doHash();
                            $this.previousHash=$this.currentHash;
                        };
                    },100);
                }
                else 
                { 		
                    $this.currentHash=window.location.hash;					
                    if($this.currentHash!=$this.previousHash) $this.doHash();

                    $(window).bind('hashchange',function(event) 
                    {
                        event.preventDefault();
                        
                        if($this.isEnable()==false) return; 
                        
                        $this.currentHash=window.location.hash;
                        $this.doHash();
                        $this.previousHash=$this.currentHash;
                    });  
                };             
            };
            
            /******************************************************************/

            this.doHash=function()
            {
                if(!$this.enable) return;
                $this.enable=false;                
                
                var isOpen=$this.isOpen();
                var currentPage=$this.checkHash();
                
                if(currentPage==false) 
                {
                    $this.enable=true;
                    return(false);
                };
                
                $this.currentPage=currentPage;
                if($this.previousPage==-1) 
                    $this.previousPage=$this.currentPage;
                
                if($this.currentPage==-1) $this.close();
                else 
                {
                    $this.genevaBoxMenuElement.removeClass('selected');
                    $('#geneva-box-menu-element-'+$this.currentPage).addClass('selected');
                    $this.open(isOpen);               
                };
            };
            
            /******************************************************************/
            
            this.checkHash=function()
            {
                if($this.currentHash=='#/main') return(-1);
                
                for(var id in $this.page)
                {
                    if('#/'+id==$this.currentHash) return(id);
                };
                
                return(false);
            };
            
            /******************************************************************/
            /******************************************************************/

            this.collapse=function(event)
            {
                var i=0;
                $this.genevaBoxMenuElement.each(function() 
                {
                    $(this).animate({top:($this.genevaBoxMenuElementMargin+(i*10)),left:$this.genevaBoxMenuElementMargin},getRandom(100,1000),'easeInOutQuint',function()
                    {
                        if((++i)==$this.genevaBoxMenuElement.length) $this.doEvent(event);
                    });
                });  
            }
            
            /******************************************************************/
            
            this.expand=function(event)
            {
                var i=0,j=0,k=0,top=0,left=0;
                
                $this.genevaBoxMenuElement.each(function() 
                {
                    top=(j*$this.genevaBoxMenuElementHeight)+$this.genevaBoxMenuElementMargin*(j+1);
                    left=(i*$this.genevaBoxMenuElementWidth)+$this.genevaBoxMenuElementMargin*(i+1);

                    $(this).animate({top:top,left:left,opacity:1},getRandom(100,1000),'easeInOutQuint',function()
                    {
                        if((++k)==$this.genevaBoxMenuElement.length) $this.doEvent(event);
                    });
                    
                    if((++i)%3==0)
                    {
                        i=0;
                        j+=1;
                    };
                });       
            };
            
            /******************************************************************/
            /******************************************************************/

            this.open=function(isOpen)
            {
                $this.selectListMenuElement();
                
                if(isOpen)
                {
                    $this.closePage({onComplete:function() 
                    {
                        $this.geneva.animate({width:$this.genevaBoxMenuElementWidth+($this.genevaBoxMenuElementMargin*2)},200,'easeInOutBounce',function() 
                        {
                            $this.geneva.animate({width:$this.genevaWidth},200,'easeInOutBounce',function() 
                            {
                                $this.openPage();
                            });
                        });             
                    }});   
                }
                else
                {
                    $this.collapse({onComplete:function() 
                    {
                        $this.openListMenu(true,{onComplete:function() 
                        {
                            $this.openPage();
                        }});
                    }});                      
                };
            };
            
            /******************************************************************/

            this.close=function()
            {
                $this.closePage({onComplete:function() 
                {
                    $this.openListMenu(false,{onComplete:function() 
                    {
                        $this.genevaBoxMenuElement.removeClass('selected');
                        $this.expand({onComplete:function() 
                        {
                            $this.enable=true;                            
                        }});
                    }});
                }});
            };
            
            /******************************************************************/
            /******************************************************************/
            
            this.getPageData=function(key,property)
            {
                return($this.page[key][property]);
            };
            
            /******************************************************************/

            this.openPage=function()
            {
                $this.clearPage();
                $this.showWindowPreloader(true);
                $this.showWindow(true);
                                
                $.get('page/'+$this.getPageData($this.currentPage,'html'),{},function(page) 
                {	
                    $this.genevaPage.html(page);                    
                    
                    jQuery.getScript('page/script/base.js',function() 
                    {
                        if($this.getPageData($this.currentPage,'js')!='')
                            jQuery.getScript('page/script/'+$this.getPageData($this.currentPage,'js'));
                    });
                    
                    $this.createScrollbar();
                    $this.showWindowPreloader(false);
                                
                    $this.showPage(true,{onComplete:function() 
                    {
                        $this.enable=true;
                        $this.showCloseButton(true);
                        $('#geneva-box-menu-element-'+$this.currentPage+' a').attr('href','#/main');
                        $this.previousPage=$this.currentPage;
                    }});            
                },
                'html');             
            };
            
            /******************************************************************/

            this.closePage=function(event)
            {
                $this.showCloseButton(false);  
                $(':input,a').qtip('destroy');
               
                if($this.previousPage!='-1')
                    $('#geneva-box-menu-element-'+$this.previousPage+' a').attr('href','#/'+this.previousPage);
                
                $this.showPage(false,{onComplete:function() 
                {
                    $this.clearPage();
                    $this.showWindow(false);   
                    $this.doEvent(event);  
                }});                
            };
            
            /******************************************************************/
            /******************************************************************/
            
            this.openListMenu=function(open,event)
            {
                $this.genevaListMenu.animate({height:(open ? 370 : 0)},getRandom(100,500),'easeInOutQuint',function()
                {
                    $this.doEvent(event);                 
                });
            };
            
            /******************************************************************/
            
            this.selectListMenuElement=function()
            {
                $this.genevaListMenu.find('a').removeClass('selected');
                $('#geneva-list-menu-element-'+$this.currentPage).addClass('selected');               
            }
            
            /******************************************************************/
            /******************************************************************/
            
            this.isOpen=function()
            {
                return($this.currentPage==-1 ? false : true);
            };
            
            /******************************************************************/
            
            this.isEnable=function()
            {
                if(!$this.enable)
                {
                    window.location.href=$this.previousHash;
                    return(false);
                }  
                
                return(true);
            };
            
            /******************************************************************/
            /******************************************************************/
            
            this.clearPage=function()
            {
                $this.genevaPage.html('');
            };
            
            /******************************************************************/
            
            this.showPage=function(show,event)
            {
                $this.genevaPage.animate({opacity:(show ? 1 : 0)},getRandom(100,1000),'easeInOutQuint',function()
                {
                    $this.doEvent(event);                 
                });               
            }
            
            /******************************************************************/
            /******************************************************************/
            
            this.showCloseButton=function(show)
            {
                $this.genevaCloseButton.css('display',show ? 'block' : 'none');
            };
            
            /******************************************************************/
            /******************************************************************/
            
            this.showWindow=function(show)
            {
                if(show) $this.genevaWindow.css('display','block');
                else $this.genevaWindow.css('display','none');
            };
            
            /******************************************************************/
            
            this.showWindowPreloader=function(show)
            {
                if(show) $this.genevaWindow.addClass('preloader');
                else $this.genevaWindow.removeClass('preloader');
            };
            
            /******************************************************************/
            /******************************************************************/

            this.createScrollbar=function()
            {
                $this.scrollbar=$this.genevaWindow.jScrollPane({maintainPosition:false,autoReinitialise:true}).data('jsp');
            };
            
            /******************************************************************/
            /******************************************************************/
            
            this.doEvent=function(event)
            {
                if(typeof(event)!='undefined')
                {
                    if(typeof(event.onComplete)!='undefined') event.onComplete.apply();
                };                  
            };
            
            /******************************************************************/
        };

        /**************************************************************/

        $.fn.geneva=function(page)
        {
            /***********************************************************/

            var geneva=new Geneva(this,page);
            geneva.load();

            /***********************************************************/
        };

        /**************************************************************/

    })(jQuery);