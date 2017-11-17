'use strict;'
var fadeStart=50// 100px scroll or less will equiv to 1 opacity
    ,fadeUntil=600 // 200px scroll or more will equiv to 0 opacity
    ,fading = $('header')
;
window.onload = function(){
  fading = $('header');
  //title of page
  document.title = "put the project title here";
  //image of header
  $('header').css('background-image', "url('../projectimages/aquaticparentingbg.png')");
  //title of titlebubble
  $('#bubbleTitle').text("title");
  //content
  $('#margins').append("<p></p>");
}

$(window).on('scroll', function(){
    var offset = $(document).scrollTop()
        ,opacity=0
    ;
    if( offset<=fadeStart ){
        opacity=1;
    }else if( offset<=fadeUntil ){
        opacity=1-offset/fadeUntil;
    }
    fading.css('opacity',opacity);
});