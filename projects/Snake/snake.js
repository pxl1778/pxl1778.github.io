'use strict';

var app = app || {};

window.onload = function(){
	app.init();
	sound.init();
	app.sound = sound;
}

app = {
	deltaTime: 0.0,
	lastTime: 0.0,
	tiles: new Array(),
	canvas: undefined,
	ctx: undefined,
	rows: 0,
	cols: 0,
	tileSize: 25,
	snake: undefined,
	circles: [],
	gameState: undefined,
	sound: undefined,
	pickedUp: [],
	pickedUpNear: [],
	GAMESTATE:{
		main: 0,
		pause: 1,
		gameOver: 2
	},
	direction: {
		up: 0,
		right: 1,
		down: 2,
		left: 3
	},
	pickup: { row: 10, col: 15},
	
	init: function(){
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
		
		//creating the grid
		this.rows = this.canvas.width/this.tileSize;
		this.cols = this.canvas.height/this.tileSize;
		this.ctx.strokeStyle = "#EEEEEE";
		this.ctx.fillStyle = "#FFFFFF";
		for (var i=0;i<this.rows;i++) {
			this.tiles[i]=new Array();
			for (var j=0;j<this.cols;j++) {
				this.tiles[i][j]={row: i, col: j };
				this.ctx.fillRect(this.tiles[i][j].row*this.tileSize, this.tiles[i][j].col * this.tileSize, this.tileSize, this.tileSize);
				this.ctx.strokeRect(this.tiles[i][j].row*this.tileSize, this.tiles[i][j].col * this.tileSize, this.tileSize, this.tileSize);
			}
		}
		
		//creating the snake
		this.snake = { row: 5, 
					   col: 10,
					   timer: 0.0,
					   speed: 3.0, 
					   time: 0.0,
					   direction: app.direction.down,
					   body: new Array(),
					   init: function(){
						   this.body[0] = {row: this.row, col: this.col};
						   this.body[1] = {row: this.row -1, col: this.col};
						   this.body[2] = {row: this.row -2, col: this.col};
					   },
					   update: function(){
						   this.timer += app.deltaTime * this.speed;
						   
						   if(this.timer >= 1.0)
						   {
							   this.timer = 0.0;
							   var tailRow = this.body[this.body.length-1].row;
							   var tailCol = this.body[this.body.length-1].col;
							   for(var i=this.body.length-1; i>=1; i--)
								{
									this.body[i].row = this.body[i-1].row;
									this.body[i].col = this.body[i-1].col;
								}
							   if(this.direction == app.direction.down)
							   {
									this.body[0].row ++;
							   }
							   if(this.direction == app.direction.up)
							   {
									this.body[0].row --;
							   }
							   if(this.direction == app.direction.right)
							   {
									this.body[0].col ++;
							   }
							   if(this.direction == app.direction.left)
							   {
									this.body[0].col --;
							   }
							   
							   //checking collisions
							   //pickup
							   if(app.pickup.row == this.body[0].row && app.pickup.col == this.body[0].col)
							   {
								   app.pickedUp.push({row: app.pickup.row, col: app.pickup.col, color: "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")"});
								   app.pickedUpNear.push({row: app.pickup.row-1, col: app.pickup.col, color: "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")"});
								   app.pickedUpNear.push({row: app.pickup.row, col: app.pickup.col-1, color: "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")"});
								   app.pickedUpNear.push({row: app.pickup.row+1, col: app.pickup.col, color: "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")"});
								   app.pickedUpNear.push({row: app.pickup.row, col: app.pickup.col+1, color: "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")"});
								   app.circles.push(new Circle(app.pickup.col * app.tileSize, app.pickup.row * app.tileSize, 50, 50, 50));
								   app.pickup.row = getRandom(0, app.cols-1);
								   app.pickup.col = getRandom(0, app.rows-1);
								   this.speed += .5;
								   this.body[this.body.length] = { row: tailRow, col: tailCol };
								   app.sound.playEffect();
								   
							   }
							   //walls
							   //bottom wall
							   if(this.body[0].row >= app.cols)
							   {
								   app.gameState = app.GAMESTATE.gameOver;
							   }
							   //top wall
							   if(this.body[0].row < 0)
							   {
								   app.gameState = app.GAMESTATE.gameOver;
							   }
							   //right wall
							   if(this.body[0].col >= app.rows)
							   {
								   app.gameState = app.GAMESTATE.gameOver;
							   }
							   //left wall
							   if(this.body[0].col < 0)
							   {
								   app.gameState = app.GAMESTATE.gameOver;
							   }
							   //colliding with body
							   for(var i=1; i<this.body.length; i++)
							   {
								   if(this.body[0].row == this.body[i].row && this.body[0].col == this.body[i].col)
								   {
									   app.gameState = app.GAMESTATE.gameOver;
								   }
							   }
							   //changing colors
							   for(var i=0; i<app.pickedUp.length; i++)
							   {
								   app.pickedUp[i].color = "rgb(" + getRandom(100, 255) + "," + getRandom(100, 255) + "," + getRandom(100, 255) + ")";
							   }
							   for(var i=0; i<app.pickedUpNear.length; i++)
							   {
								   app.pickedUpNear[i].color = "rgba(" + getRandom(100, 255) + "," + getRandom(100, 255) + "," + getRandom(100, 255) + ",.2)";
							   }
							   
						   }
						   for(var i=0; i<this.body.length; i++)
						   {
							   app.drawTile(this.body[i].row, this.body[i].col);
						   }
						   
					   }
		};
		//gameState
		this.gameState = this.GAMESTATE.main;
		this.snake.init();
		this.update();
	},
	
	update: function(){
		
		if(this.gameState == this.GAMESTATE.main)
		{
			this.deltaTime = this.calculateDeltaTime();
			//redrawing the canvas
			this.ctx.strokeStyle = "#EEEEEE";
			this.ctx.fillStyle = "#FFFFFF";
			for (var i=0;i<this.rows;i++) {
				for (var j=0;j<this.cols;j++) {
					this.ctx.fillRect(this.tiles[i][j].row*this.tileSize, this.tiles[i][j].col * this.tileSize, this.tileSize, this.tileSize);
					this.ctx.strokeRect(this.tiles[i][j].row*this.tileSize, this.tiles[i][j].col * this.tileSize, this.tileSize, this.tileSize);
				}
			}
			//draw picked up squares
			for(var i=0; i<this.pickedUpNear.length; i++)
			{
				this.ctx.fillStyle = this.pickedUpNear[i].color;
				this.drawTile(this.pickedUpNear[i].row, this.pickedUpNear[i].col);
			}
			for(var i=0; i<this.pickedUp.length; i++)
			{
				this.ctx.fillStyle = this.pickedUp[i].color;
				this.drawTile(this.pickedUp[i].row, this.pickedUp[i].col);
			}
			this.ctx.fillStyle = "#000000";
			//Reading in Player input
			if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP] && this.snake.direction != app.direction.down){
				this.snake.direction = app.direction.up;
			}
			if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN] && this.snake.direction != app.direction.up){
				this.snake.direction = app.direction.down;
			}
			if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT] && this.snake.direction != app.direction.left){
				this.snake.direction = app.direction.right;
			}
			if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT] && this.snake.direction != app.direction.right){
				this.snake.direction = app.direction.left;
			}
			
			this.snake.update();
			this.drawTile(this.pickup.row, this.pickup.col);
			//draw circles
			for(var i=0; i<this.circles.length; i++)
			{
				this.circles[i].display();
			}
			this.manageCircles();
			requestAnimationFrame(this.update.bind(this));
		}
		if(this.gameState == this.GAMESTATE.pause)
		{
			this.ctx.fillStyle = "rgba(255, 255, 255, .05)"
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.fillStyle = "rgb(0, 0, 0)";
			this.ctx.font = "50px Verdana";
			this.ctx.fillText("Paused", this.canvas.width/2, this.canvas.height/2);
			requestAnimationFrame(this.update.bind(this));
		}
		if(this.gameState == this.GAMESTATE.gameOver)
		{
			this.ctx.fillStyle = "rgba(255, 255, 255, .5)"
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.fillStyle = "rgb(0, 0, 0)";
			this.ctx.font = "50px Verdana";
			this.ctx.fillText("Game Over", this.canvas.width/2, this.canvas.height/2);
			this.ctx.font = "25px Verdana";
			this.ctx.fillText("Press Space to Play Again", this.canvas.width/2, this.canvas.height/2 + 50);
		}
	},
	
	drawTile: function(y, x){
		this.ctx.fillRect(Math.floor(x) * this.tileSize, Math.floor(y) * this.tileSize, this.tileSize, this.tileSize);
	},
	
	calculateDeltaTime: function(){
		var now,fps;
		now = (+new Date); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
	
	manageCircles: function(){
        for(var i=0; i<this.circles.length; i++)
        {
            if(this.circles[i].opacity < 0)
            {
                this.circles.splice(i, 1);
            }
        }
	}
}

function clamp(val, min, max){
	return Math.max(min, Math.min(max, val));
}

function getRandom(min, max) {
  	return Math.floor(Math.random() * (max - min) + min);
}