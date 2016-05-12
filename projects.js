'use strict';

window.onload = function(){
	var current = "";
	document.getElementById("armoirebubble").onmouseover = function(e){
		if(current != "#armoirebg")
		{
			$('#armoirebg').css("z-index", "-2");
			$("#armoirebg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#armoirebg";
		}
	}
	document.getElementById("asteroidsbubble").onmouseover = function(e){
		if(current != "#asteroidsbg")
		{
			$('#asteroidsbg').css("z-index", "-2");
			$("#asteroidsbg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#asteroidsbg";
		}
	}
	document.getElementById("audiovisualizerbubble").onmouseover = function(e){
		if(current != "#audiovisualizerbg")
		{
			$('#audiovisualizerbg').css("z-index", "-2");
			$("#audiovisualizerbg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#audiovisualizerbg";
		}
	}
	document.getElementById("switchbladebubble").onmouseover = function(e){
		if(current != "#switchbladebg")
		{
			$('#switchbladebg').css("z-index", "-2");
			$("#switchbladebg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#switchbladebg";
		}
	}
	document.getElementById("wordventurebubble").onmouseover = function(e){
		if(current != "#wordventurebg")
		{
			$('#wordventurebg').css("z-index", "-2");
			$("#wordventurebg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#wordventurebg";
		}
	}
}