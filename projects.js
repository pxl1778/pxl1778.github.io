'use strict';

window.onload = function(){
	var current = "";
	
	document.getElementById("lighthousebubble").onmouseover = function(e){
		if(current != "#lighthousebg")
		{
			$('#lighthousebg').css("z-index", "-2");
			$("#lighthousebg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#lighthousebg";
		}
	}
	document.getElementById("paperbattlebubble").onmouseover = function(e){
		if(current != "#paperbattlebg")
		{
			$('#paperbattlebg').css("z-index", "-2");
			$("#paperbattlebg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#paperbattlebg";
		}
	}
	document.getElementById("nextbigadventurebubble").onmouseover = function(e){
		if(current != "#nextbigadventurebg")
		{
			$('#nextbigadventurebg').css("z-index", "-2");
			$("#nextbigadventurebg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#nextbigadventurebg";
		}
	}
	document.getElementById("dogsoulsbubble").onmouseover = function(e){
		if(current != "#dogsoulsbg")
		{
			$('#dogsoulsbg').css("z-index", "-2");
			$("#dogsoulsbg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#dogsoulsbg";
		}
	}
	document.getElementById("huebertsperilbubble").onmouseover = function(e){
		if(current != "#huebertsperilbg")
		{
			$('#huebertsperilbg').css("z-index", "-2");
			$("#huebertsperilbg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#huebertsperilbg";
		}
	}
	// document.getElementById("aperfectyearbubble").onmouseover = function(e){
	// 	if(current != "#aperfectyearbg")
	// 	{
	// 		$('#aperfectyearbg').css("z-index", "-2");
	// 		$("#aperfectyearbg").fadeIn("slow");
	// 		$(current).css("z-index", "-3");
	// 		$(current).fadeOut();
	// 		current = "#aperfectyearbg";
	// 	}
	// }
	document.getElementById("sense3bubble").onmouseover = function(e){
		if(current != "#sense3bg")
		{
			$('#sense3bg').css("z-index", "-2");
			$("#sense3bg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#sense3bg";
		}
	}
	document.getElementById("aquaticparentingbubble").onmouseover = function(e){
		if(current != "#aquaticparentingbg")
		{
			$('#aquaticparentingbg').css("z-index", "-2");
			$("#aquaticparentingbg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#aquaticparentingbg";
		}
	}
	// document.getElementById("armoirebubble").onmouseover = function(e){
	// 	if(current != "#armoirebg")
	// 	{
	// 		$('#armoirebg').css("z-index", "-2");
	// 		$("#armoirebg").fadeIn("slow");
	// 		$(current).css("z-index", "-3");
	// 		$(current).fadeOut();
	// 		current = "#armoirebg";
	// 	}
	// }
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
	/*document.getElementById("audiovisualizerbubble").onmouseover = function(e){
		if(current != "#audiovisualizerbg")
		{
			$('#audiovisualizerbg').css("z-index", "-2");
			$("#audiovisualizerbg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#audiovisualizerbg";
		}
	}*/
	document.getElementById("snakebubble").onmouseover = function(e){
		if(current != "#snakebg")
		{
			$('#snakebg').css("z-index", "-2");
			$("#snakebg").fadeIn("slow");
			$(current).css("z-index", "-3");
			$(current).fadeOut();
			current = "#snakebg";
		}
	}
	/*document.getElementById("switchbladebubble").onmouseover = function(e){
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
	}*/
}
