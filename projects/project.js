'use strict;'
var fadeStart=50// 100px scroll or less will equiv to 1 opacity
    ,fadeUntil=600 // 200px scroll or more will equiv to 0 opacity
    ,fading = $('header')
;
window.onload = function(){
    fading = $('header');
    console.log("starting");
    $.getJSON('aquaticParenting.json', function (data){
        console.log(data);
        //title of page
        document.title = data.projects.aquaticParenting.title;
        //image of header
        $('header').css('background-image', "url(" + data.projects.aquaticParenting.backgroundImage + ")");
        //title of titlebubble
        $('#bubbleTitle').text(data.projects.aquaticParenting.title);
        //github link
        $('#githubLink').attr("href", data.projects.aquaticParenting.githubLink);
        //play link
        $('#playLink').attr("href", data.projects.aquaticParenting.playLink);
        //content
        $('#margins').append(data.projects.aquaticParenting.content);
    });
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