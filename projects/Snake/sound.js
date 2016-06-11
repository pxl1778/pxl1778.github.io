// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
var sound = (function(){
	// var bgAudio = undefined;
	var effectAudio = undefined;
	var currentEffect = 0;
	var currentDirection = 1;
	var effectSounds = ["1.mp3","2.mp3","3.mp3","4.mp3","5.mp3","6.mp3","7.mp3"];
	

	function init(){
		// bgAudio = document.querySelector("#bgAudio");
		// bgAudio.volume=0.25;
		effectAudio = document.querySelector("#effectAudio");
		effectAudio.volume = 0.3;
	}
		
	// function stopBGAudio(){
	// 	bgAudio.pause();
	// 	bgAudio.currentTime = 0;
	// }
	
	function playEffect(){
		var rand = Math.random();
		if(rand < .5)
		{
			effectAudio.src = "Soundfiles/BigAsteroids/Big Asteroid" + effectSounds[currentEffect];
		}
		else
		{
			effectAudio.src = "Soundfiles/LittleAsteroids/Little asteroids" + effectSounds[currentEffect];
		}
		effectAudio.play();
		currentEffect += currentDirection;
		if (currentEffect == effectSounds.length || currentEffect == -1){
			currentDirection *= -1;
			currentEffect += currentDirection;
		}
	}
	
	// function playBGAudio(){
	// 	bgAudio.play();
	// }
		
		return{
	init: init,
	// stopBGAudio: stopBGAudio,
	playEffect: playEffect,
	// playBGAudio : playBGAudio
};
}());

