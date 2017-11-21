'use strict;'
var fadeStart=50// 100px scroll or less will equiv to 1 opacity
    ,fadeUntil=600 // 200px scroll or more will equiv to 0 opacity
    ,fading = $('header')
;
window.onload = function(){
    fading = $('header');
    console.log("starting");
    $.getJSON('projectInfo.json', function (data){
        console.log(data);
        var qs = decodeURIComponent(window.location.search);
        qs = qs.substring(1);
        qs = qs.substring(qs.indexOf("=")+1);
        console.log(qs);
        for(var i = 0; i < data.projects.length; i++){
            if (data.projects[i].urlTitle == qs ){
                //title of page
                document.title = data.projects[i].title;
                //image of header
                $('header').css('background-image', "url(" + data.projects[i].backgroundImage + ")");
                //title of titlebubble
                $('#bubbleTitle').text(data.projects[i].title);
                //github link
                if(data.projects[i].githubLink != ""){
                    $('#githublink').attr("href", data.projects[i].githubLink);
                }
                else{
                    console.log("setting the link off");
                    $('#githublink').addClass("disabledLink");
                    $('#githublink').on("click", function (e) {
                        return false;
                    });
                }
                //play link
                if(data.projects[i].playLink != ""){
                    $('#playlink').attr("href", data.projects[i].playLink);
                }
                else{
                    $('#playlink').addClass("disabledLink");
                    $('#playlink').on("click", function (e) {
                        e.preventDefault();
                    });
                }
                //content
                if(data.projects[i].images.length >0){
                    $('#margins').append("<div class='topImage'>" + data.projects[i].images[0] + "</div>");
                }
                for(var j = 0; j < data.projects[i].content.length; j++){
                    if(data.projects[i].images[j+1] != undefined){
                        if(j % 2 == 0){
                            $('#margins').append("<div class='contentImageRight'>" + data.projects[i].images[j+1] + "</div>");                                                    
                        }
                        else{
                            $('#margins').append("<div class='contentImageLeft'>" + data.projects[i].images[j+1] + "</div>");                                                    
                        }
                    }
                    $('#margins').append(data.projects[i].content[j]);
                    
                }
            }
        }
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