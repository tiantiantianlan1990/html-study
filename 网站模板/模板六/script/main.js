
    $(document).ready(function() 
    {
        var page=
        {
            'about'         :   {html:'about.html',js:''},
            'services'      :   {html:'services.html',js:''},
            'process'       :   {html:'process.html',js:''},  
            'images'        :   {html:'images.html',js:'images.js'},
            'videos'        :   {html:'videos.html',js:'videos.js'},
            'clients'       :   {html:'clients.html',js:''},
            'testimonials'  :   {html:'testimonials.html',js:''},
            'pricing'       :   {html:'pricing.html',js:''},
            'contact'       :   {html:'contact.php',js:'contact.js'}
        };
               
        $('#geneva').geneva(page);
        
        $.getJSON('http://twitter.com/statuses/user_timeline.json?screen_name=quanticalabs&count=5&callback=?', function(data) 
        {
            if(data.length)
            {
                var list=$('<ul>');
                $(data).each(function(index,value)
                {
                    list.append($('<li>').append($('<p>').html(linkify(value.text))));
                });

                $('#latest-tweets').append(list);
                $('#latest-tweets a').attr('target','_blank');

                list.bxSlider(
                {
                    auto:true,
                    pause:5000,
                    nextText:null,
                    prevText:null,
                    mode:'vertical',
                    displaySlideQty:1
                });  
            }
        });
    });