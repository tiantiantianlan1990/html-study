   for(var i= 0; i < 5; i++){
    (function (i) {
      setTimeout(function(){
       console.log(i+' ');
    }, 100);
    }(i)); // end function invoke

   } // end for 



function parseQuery(url) {
  var query = url.substring(url.indexOf('?') + 1),
    pairs,
    pair,
    args = {},
    i,
    len,
    pos,
    name,
    value;
    
  if (query && typeof query === 'string') {
    if (query.indexOf('#') !== -1) {
      query = query.substring(0, query.indexOf('#'));
    } // end if
    
    pairs = query.split('&');
    for (i = 0, len = pairs.length; i < len; ++i) {
      pair = pairs[i];
      pos = pair.indexOf('=');
      if (-1 === pos) { continue; } // end if
      
      name = pair.substring(0, pos);
      value = pair.substring(pos + 1);
      value = decodeURIComponent(value);
      
      args[name] = value;
    } // end for
  } // end if
  
  return args
} // end parseQuery()















