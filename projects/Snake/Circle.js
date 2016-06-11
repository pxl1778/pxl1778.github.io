'use strict';
var app = app || {};
var Circle = function(x, y, red, green, blue){
	this.x = x;
	this.y = y;
	this.r = red;
	this.g = green;
	this.b = blue;
	this.radius = 0;
	this.opacity = 70;
	this.maxRadius = 150;
	this.growSpeed = 2;
}	
	Circle.prototype.display = function(){
		if(this.radius < this.maxRadius)
		{
			this.radius += this.growSpeed;
			var decimalOpacity = this.opacity;
			decimalOpacity *=.01;
			if(decimalOpacity < 0)
			{
				decimalOpacity = 0;
			}
            app.ctx.strokeStyle = "rgba(0, 0, 0, 0)";
			app.ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+decimalOpacity+")";
			app.ctx.beginPath();
			app.ctx.arc(this.x + app.tileSize/2, this.y + app.tileSize / 2, this.radius, 0, 2*Math.PI);
			app.ctx.fill();
			this.opacity -= 1-(this.growSpeed * .01);
		}
		
	}
