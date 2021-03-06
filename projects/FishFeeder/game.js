"use strict";
var app = app || {};

var gameState = {
    created : false,
	preload: function(){
		app.main.game.load.audio('back', 'audio/background.mp3');
		app.main.game.load.audio('foodEat', 'audio/snap.mp3');
		app.main.game.load.audio('foodPlop', 'audio/plop.mp3');
        app.main.game.load.image("tankbackground", "images/FishTank.png");
        app.main.game.load.image("bubble", "images/bubble.png");
        app.main.game.load.image("poop", "images/poop.png");
        app.main.game.load.image("tutbackground", "images/tutorial.png");

        app.main.game.load.image("store", "images/storeicon.png", 100,100);
        app.main.game.load.image("tutorialbutton", "images/tutorialicon.png", 100,100);
        app.main.game.load.image("food1", "images/food1.png", 100,100);
        app.main.game.load.image("food2", "images/food2.png",100,100);
        app.main.game.load.image("food3", "images/food3.png");
        app.main.game.load.image("food4", "images/food4.png");
        app.main.game.load.spritesheet("fish1", "images/fish1spritesheet.png", 70, 120, 5);
        app.main.game.load.spritesheet("fish2", "images/fish2spritesheet.png", 70, 120, 5);
        app.main.game.load.spritesheet("fish3", "images/fish3spritesheet.png", 70, 120, 5);
        app.main.game.load.spritesheet("fish4", "images/fish4spritesheet.png", 70, 120, 5);
        this.created = false;
	},
    bubbleParticles: undefined,
	
	create: function(){
		app.main.zen = false;
        app.main.game.add.sprite(0, 0, "tankbackground");
		app.main.graphics = app.main.game.add.graphics(0, 0);
		app.main.prevMouse = new Phaser.Point(app.main.game.input.x, app.main.game.input.y); //Tracking the mouse position
        var store = app.main.game.add.sprite(690, 10, "store");
        var tutorialbutton = app.main.game.add.sprite(690, 120,"tutorialbutton");
        
        //particles
        app.main.bubbleParticles = app.main.game.add.emitter(0, 0, 70);
        app.main.bubbleParticles.makeParticles("bubble");
        app.main.bubbleParticles.gravity = -300;
        app.main.bubbleParticles.maxParticleSpeed.set(0, 10);
        app.main.bubbleParticles.setRotation(0, 0);
        app.main.bubbleParticles.setScale(.5, .5);
        
        //music
		app.main.music = this.sound.play('back');
		app.main.music.volume -= 0.3;
        app.main.music.loop = true;
		app.main.music = app.main.game.sound.play('background');
        app.main.music.volume = .5;
        
        //On screen text
        // var style = { font: "30px Gloria Hallelujah", fill: "#fff", align: "left"};
        app.main.text = app.main.game.add.text(120, 50, "Fish size: " + "cm");
        
        app.main.text.anchor.set(.5);
        app.main.text.font = "Gloria Hallelujah";
        app.main.text.fontSize = 30;
        app.main.text.fill = '#fff';
         
        //Keyboard imports

        app.main.keySpace = app.main.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		app.main.keySpace.onDown.add(setPause, this);
		 
		app.main.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
               
		
        //Setting up physics for game objects
		app.main.foodGroup = app.main.game.add.group();
		app.main.foodGroup.enableBody = true;
		app.main.foodGroup.physicsBodyType = Phaser.Physics.ARCADE;
        app.main.fishGroup = app.main.game.add.group();
        app.main.fishGroup.enableBody = true;
        app.main.fishGroup.physicsBodyType = Phaser.Physics.ARCADE;
        app.main.poopGroup = app.main.game.add.group();
        app.main.poopGroup.enableBody = true;
        app.main.poopGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        
        //initializing the fish
        app.main.fishArr.push(app.main.fishGroup.create(0, 0, "fish1"));
        app.main.fishArr[0].animations.add("swim1");
        app.main.fishArr[0].play("swim1", 10, true);
        app.main.fishArr[0].anchor.setTo(.5, .5);
        for(var i=0; i<app.main.fishArr.length; i++)
        {
            app.main.initializeFish(app.main.fishArr[i], 1);
        }
        this.created = true;
        
        
        //store
        store.inputEnabled = true;
        store.events.onInputDown.add(storeOpen, this);
       
		//instructions
		tutorialbutton.inputEnabled = true;
        tutorialbutton.events.onInputDown.add(tutorialScreen, this);
	},
	
	update: function(){
        if(this.created)
        {
            this.displayAll(); //Displays all of the objects in the scene
            this.manageCircles(); //Deals with drawing the circle special effects
            for(var i=0; i<app.main.fishArr.length; i++)
            {
                app.main.fishArr[i].update(); //updating every fish that might be on the screen
            }
            
            this.checkFoodCollision(); //Checks if the fish has collided with the food
            this.click(); //Checks for clicking to feed the fish
            
            app.main.prevMouse = new Phaser.Point(app.main.game.input.x, app.main.game.input.y); //recording the moues pos
            
            //displaying fish information
            if(app.main.fishArr.length == 1)
            {
                app.main.text.y = 50;
                app.main.text.setText("Fish size: " + app.main.fishArr[0].size +"cm\nMoney: " + app.main.money);
            }
            if(app.main.fishArr.length == 2)
            {
                app.main.text.y = 75;
                app.main.text.setText("Fish size: " + app.main.fishArr[0].size + "cm\nFish size: " + app.main.fishArr[1].size + "cm\nMoney: " + app.main.money);
            }
            if(app.main.fishArr.length == 3)
            {
                app.main.text.y = 100;
                app.main.text.setText("Fish size: " + app.main.fishArr[0].size + "cm\nFish size: " + app.main.fishArr[1].size + "cm\nFish size: " + app.main.fishArr[2].size +"cm\nMoney: " + app.main.money);
            }
            if(app.main.fishArr.length == 4)
            {
                app.main.text.y = 125;
                app.main.text.setText("Fish size: " + app.main.fishArr[0].size + "cm\nFish size: " + app.main.fishArr[1].size + "cm\nFish size: " + app.main.fishArr[2].size + "cm\nFish size: " + app.main.fishArr[3].size + "cm\nMoney: " + app.main.money);
            }
            if(app.main.fishArr.length < 1)
            {
                app.main.game.state.start("flushed");
                app.main.game.cache.removeSound('back');
            }
        }
	},
	
	//method to display all of the objects
    displayAll: function(){
            app.main.graphics.clear();
            app.main.graphics.lineStyle(5, 0x000000, 1);
            app.main.graphics.drawRect(0, 0, 800, 600);
            for(var i=0; i<app.main.puddles.length; i++)
            {
                app.main.puddles[i].display();
            }
            for(var i=0; i<app.main.circles.length; i++)
            {
                app.main.circles[i].display();
            }
            // for(var i=0; i<app.main.food.length; i++)
            // {
            //     app.main.food[i].display();
            // }
            // for(var i=0; i<app.main.fishArr.length; i++)
            // {
            //     app.main.fishArr[i].display();
            // }
            // for(var i=0; i<app.main.poop.length; i++)
            // {
            //     app.main.poop[i].display();
            // }
        },
        
        //Checks whether or not the fish is colliding with the food.
        checkFoodCollision: function(){
            for(var i=0; i<app.main.food.length; i++)
            {
                for(var j=0; j<app.main.fishArr.length; j++)
                {
                    if(app.main.game.physics.arcade.collide(app.main.fishArr[j], app.main.food[i]))
                    {
                        //particle
                        app.main.bubbleParticles.x = app.main.food[i].x;
                        app.main.bubbleParticles.y = app.main.food[i].y;
                        app.main.bubbleParticles.start(true, 5000, null, 7);
                        //removing food
                        app.main.food[i].destroy();
                        app.main.food.splice(i, 1);
                        //fish grows
                        app.main.fishArr[j].width++;
                        app.main.fishArr[j].body.width++;
                        app.main.fishArr[j].height = app.main.fishArr[j].width * (12/7);
                        app.main.fishArr[j].body.height++;
                        if(app.main.soundEffectsOn)
                        {
                            app.main.foodEat = app.main.game.sound.play('foodEat');
                        }
                        app.main.foodEat.volume -= 0.3;
                        
                    }
                }
            }
        },
        
        //Draws puddles on the screen when the mouse moves
        manageCircles: function(){
            for(var i=0; i<app.main.circles.length; i++)
            {
                if(app.main.circles[i].opacity < 0)
                {
                    app.main.circles.splice(i, 1);
                }
            }
            
            for(var i=0; i<app.main.puddles.length; i++)
            {
                if(app.main.puddles[i].opacity < 0)
                {
                    app.main.puddles.splice(i, 1);
                }
            }
            
            if(app.main.prevMouse.x != app.main.game.input.x && app.main.prevMouse.y != app.main.game.input.y)
            {
                app.main.puddles.push(new Circle(app.main.game.input.x, app.main.game.input.y, 195, 245, 255));
            }
        },
        
        //Called every frame, checks if the player is clicking to leave food.
        click: function(){
	        if(app.main.overlay == false){
		    //if(app.main.keySpace ==false){
            if(app.main.game.input.activePointer.isDown && app.main.isMouseDown == false)
            {
                app.main.isMouseDown = true;
                if(app.main.soundEffectsOn)
                {
                    app.main.foodPlop = app.main.game.sound.play('foodPlop');                   
                }
                app.main.circles.push(new Circle(app.main.game.input.x, app.main.game.input.y, Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70)));
                app.main.food.push(app.main.foodGroup.create(app.main.game.input.x, app.main.game.input.y, app.main.foodType));
                app.main.initializeFood(app.main.food[app.main.food.length -1], "basic");
                
            }
            //Making sure you can only click once.
            if(app.main.game.input.activePointer.isUp)
            {
                app.main.isMouseDown = false;
            }
		}
	//}
	}
}

function storeOpen(item) {
   	if(app.main.clickedStore == false){
   		app.main.overlay = true;
   	   
   		app.main.graphicOverlay = new Phaser.Graphics(this.game, 0 , 0);
   		
   		app.main.graphicOverlay.beginFill(0x000000, 0.7);
   		app.main.graphicOverlay.drawRect(0,0, 650, 800);
   		app.main.graphicOverlay.endFill();
   		
   		
   		this.overlay = this.game.add.image(-10,-10,app.main.graphicOverlay.generateTexture());
   		this.overlay.inputEnabled = true;
   	
   		app.main.xClose = app.main.game.add.text(600, 50, "X");
   		app.main.xClose.anchor.set(.5);
        app.main.xClose.font = "Gloria Hallelujah";
        app.main.xClose.fontSize = 50;
        app.main.xClose.fill = '#fff';
        
        app.main.xClose.inputEnabled = true;
		app.main.xClose.events.onInputOver.add(over, this);
		app.main.xClose.events.onInputOut.add(out, this);
		app.main.xClose.events.onInputDown.add(storeClose, this);
		
		
		//Fist food information in the store
		app.main.storePics[0] = app.main.game.add.image(50, 100, 'food2');
		
        if(app.main.zen)
        {
            app.main.foodtwo = app.main.game.add.text(100, 250, "Free");
        }
        else
        {
		    app.main.foodtwo = app.main.game.add.text(100, 250, "Cost: $10\nx2");            
        }
   		app.main.foodtwo.anchor.set(.5);
        app.main.foodtwo.font = "Gloria Hallelujah";
        app.main.foodtwo.fontSize = 20;
        app.main.foodtwo.fill = '#fff';
        
        app.main.foodtwo.inputEnabled = true;
		app.main.foodtwo.events.onInputOver.add(over, this);
		app.main.foodtwo.events.onInputOut.add(out, this);
		app.main.foodtwo.events.onInputDown.add(foodTwo, this);
        if(app.main.storeArr[0])
        {
            app.main.foodtwo.setText("Sold");
        }

		//second food option in the store
		app.main.storePics[1] = app.main.game.add.image(250, 100, 'food3');
		if(app.main.zen)
        {
		  app.main.foodthree = app.main.game.add.text(300, 250, "Free");
        }
        else
        {
		     app.main.foodthree = app.main.game.add.text(300, 250, "Cost: $100\nx3");
        }
   		app.main.foodthree.anchor.set(.5);
        app.main.foodthree.font = "Gloria Hallelujah";
        app.main.foodthree.fontSize = 20;
        app.main.foodthree.fill = '#fff';
        
        app.main.foodthree.inputEnabled = true;
		app.main.foodthree.events.onInputOver.add(over, this);
		app.main.foodthree.events.onInputOut.add(out, this);
		app.main.foodthree.events.onInputDown.add(foodThree, this);
        if(app.main.storeArr[1])
        {
            app.main.foodthree.setText("Sold");
        }

		//fourth food option in the store
		app.main.storePics[2] = app.main.game.add.image(450, 100, 'food4');
		
        if(app.main.zen)
        {
		  app.main.foodfour = app.main.game.add.text(500, 250, "Free");
        }
		else{
            app.main.foodfour = app.main.game.add.text(500, 250, "Cost: $1000\nx4");
        }
   		app.main.foodfour.anchor.set(.5);
        app.main.foodfour.font = "Gloria Hallelujah";
        app.main.foodfour.fontSize = 20;
        app.main.foodfour.fill = '#fff';
        
        app.main.foodfour.inputEnabled = true;
		app.main.foodfour.events.onInputOver.add(over, this);
		app.main.foodfour.events.onInputOut.add(out, this);
		app.main.foodfour.events.onInputDown.add(foodFour, this);
        if(app.main.storeArr[2])
        {
            app.main.foodfour.setText("Sold");
        }
		
		
		
		//First fish option in the store
		app.main.storePics[3] = app.main.game.add.image(50, 350, 'fish2');
		
        if(app.main.zen)
        {
            app.main.fishtwo = app.main.game.add.text(100, 500, "Free");
        }
		else
        {
            app.main.fishtwo = app.main.game.add.text(100, 500, "Cost: $50\n+10");
        }
   		app.main.fishtwo.anchor.set(.5);
        app.main.fishtwo.font = "Gloria Hallelujah";
        app.main.fishtwo.fontSize = 20;
        app.main.fishtwo.fill = '#fff';
        
        app.main.fishtwo.inputEnabled = true;
		app.main.fishtwo.events.onInputOver.add(over, this);
		app.main.fishtwo.events.onInputOut.add(out, this);
		app.main.fishtwo.events.onInputDown.add(fishTwo, this);
		if(app.main.storeArr[3])
        {
            app.main.fishtwo.setText("Sold");
        }
		
		app.main.storePics[4] = app.main.game.add.image(250, 350, 'fish3');
			
		if(app.main.zen)
        {
		  app.main.fishthree = app.main.game.add.text(300, 500, "Free");
        }
        else{
		   app.main.fishthree = app.main.game.add.text(300, 500, "Cost: $500\n+20");
        }
   		app.main.fishthree.anchor.set(.5);
        app.main.fishthree.font = "Gloria Hallelujah";
        app.main.fishthree.fontSize = 20;
        app.main.fishthree.fill = '#fff';
        
        app.main.fishthree.inputEnabled = true;
		app.main.fishthree.events.onInputOver.add(over, this);
		app.main.fishthree.events.onInputOut.add(out, this);
		app.main.fishthree.events.onInputDown.add(fishThree, this);
		if(app.main.storeArr[4])
        {
            app.main.fishthree.setText("Sold");
        }
        
		app.main.storePics[5] = app.main.game.add.image(450, 350, 'fish4');
        
        if(app.main.zen)
        {
           	app.main.fishfour = app.main.game.add.text(500, 500, "Free"); 
        }
        else
        {
		      app.main.fishfour = app.main.game.add.text(500, 500, "Cost: $10000\n+100");            
        }

   		app.main.fishfour.anchor.set(.5);
        app.main.fishfour.font = "Gloria Hallelujah";
        app.main.fishfour.fontSize = 20;
        app.main.fishfour.fill = '#fff';
        
        app.main.fishfour.inputEnabled = true;
		app.main.fishfour.events.onInputOver.add(over, this);
		app.main.fishfour.events.onInputOut.add(out, this);
		app.main.fishfour.events.onInputDown.add(fishFour, this);
		if(app.main.storeArr[5])
        {
            app.main.fishfour.setText("Sold");
        }
		}
		app.main.clickedStore = true;
 }


function storeClose(item) {
	
   	this.overlay.destroy();
   	app.main.xClose.destroy();
   	app.main.foodtwo.destroy();
   	app.main.foodthree.destroy();
   	app.main.foodfour.destroy();
   	app.main.fishtwo.destroy();
   	app.main.fishthree.destroy();
   	app.main.fishfour.destroy();
       
    for(var i=0; i<app.main.storePics.length; i++)
    {
        app.main.storePics[i].destroy();
    }
   	   	
   	app.main.overlay = false;
   	app.main.clickedStore = false;
    app.main.isMouseDown = true;
}

function over(item) {

    item.fill = "#2196F3";

}

function out(item) {

    item.fill = "#ffffff";

}

function tutorialScreen(item){
	//item =  app.main.game.state.start("tutorial");
	
	
//app.main.tutbackground = new Phaser.Graphics(this.game, 0 , 0);
	//app.main.tutbackground = app.main.game.add.graphics(0, 0);
	app.main.tutback = app.main.game.add.sprite(0, 0, "tutbackground");
	app.main.closeTut = app.main.game.add.text(755, 580, "close");
	
	//this.tutback = this.game.add.image(-10,-10, app.main.tutbackground.generateTexture());
   	app.main.tutback.inputEnabled = true;
   	
   	//exit button to leave menu and return to game	
   	app.main.closeTut.anchor.set(.5);
    app.main.closeTut.font = "Gloria Hallelujah";
    app.main.closeTut.fontSize = 35;
    app.main.closeTut.fill = '#fff';
        
    app.main.closeTut.inputEnabled = true;
	app.main.closeTut.events.onInputOver.add(over, this);
	app.main.closeTut.events.onInputOut.add(out, this);
	app.main.closeTut.events.onInputDown.add(exitTut, this);
    app.main.overlay = true;
}

function exitTut(item)
{
    app.main.isMouseDown = true;
	app.main.tutback.destroy();
	app.main.closeTut.destroy();
	app.main.overlay = false;
}

function foodTwo(item){
    if(app.main.zen)
    {
        if(app.main.money >= 0 && !app.main.storeArr[0])
        {
            app.main.foodType = "food2";
            app.main.multiplier += 1;
            app.main.money -= 0;
        }
    }
    else if(app.main.money >= 10 && !app.main.storeArr[0])
    {
        app.main.foodType = "food2";
        app.main.foodtwo.setText("Sold");
        app.main.storeArr[0] = true;
        app.main.multiplier += 1;
        app.main.money -= 10;
    }
}


function foodThree(item){
    if(app.main.zen)
    {
        if(app.main.money >= 0 && !app.main.storeArr[1])
        {
        app.main.foodType = "food3";
        app.main.multiplier += 1;
        app.main.money -= 0;
        }
    }
    else if(app.main.money >= 100 && !app.main.storeArr[1])
    {
	   app.main.foodType = "food3";
       app.main.foodthree.setText("Sold");
       app.main.storeArr[1] = true;
       app.main.multiplier += 1;
       app.main.money -= 100;
    }
}


function foodFour(item){
    if(app.main.zen)
    {
        if(app.main.money >= 0 && !app.main.storeArr[2])
        {
            app.main.foodType = "food4";
            app.main.multiplier += 1;
            app.main.money -= 0;
        }
    }
    else if(app.main.money >= 1000 && !app.main.storeArr[2])
    {
        app.main.foodType = "food4";
        app.main.foodfour.setText("Sold");
        app.main.storeArr[2] = true;
        app.main.multiplier += 1;
        app.main.money -= 1000;
    }
}



function fishTwo(item){
    if(app.main.zen)
    {
        if(app.main.money >= 0 && !app.main.storeArr[3])
        {
            app.main.fishArr.push(app.main.fishGroup.create(0, 0, "fish2"));
            app.main.fishArr[app.main.fishArr.length-1].animations.add("swim2");
            app.main.fishArr[app.main.fishArr.length-1].play("swim2", 10, true);
            app.main.fishArr[app.main.fishArr.length-1].anchor.setTo(.5, .5);
            app.main.initializeFish(app.main.fishArr[app.main.fishArr.length-1], 10);
            
            app.main.money -=0;
        }
    }
    else if(app.main.money >= 0 && !app.main.storeArr[3])
    {
        app.main.fishtwo.setText("Sold");
        app.main.storeArr[3] = true;
        
        app.main.fishArr.push(app.main.fishGroup.create(0, 0, "fish2"));
        app.main.fishArr[app.main.fishArr.length-1].animations.add("swim2");
        app.main.fishArr[app.main.fishArr.length-1].play("swim2", 10, true);
        app.main.fishArr[app.main.fishArr.length-1].anchor.setTo(.5, .5);
        app.main.initializeFish(app.main.fishArr[app.main.fishArr.length-1], 10);
        
        app.main.money -=0;
    }
	
}

function fishThree(item){
    if(app.main.zen)
    {
        if(app.main.money >= 0 && !app.main.storeArr[4])
        {
            app.main.fishArr.push(app.main.fishGroup.create(0, 0, "fish3"));
            app.main.fishArr[app.main.fishArr.length-1].animations.add("swim3");
            app.main.fishArr[app.main.fishArr.length-1].play("swim3", 10, true);
            app.main.fishArr[app.main.fishArr.length-1].anchor.setTo(.5, .5);
            app.main.initializeFish(app.main.fishArr[app.main.fishArr.length-1], 20);
            app.main.money -= 0;
        }
    }
    else if(app.main.money >= 500 && !app.main.storeArr[4])
    {
        app.main.fishArr.push(app.main.fishGroup.create(0, 0, "fish3"));
        app.main.fishArr[app.main.fishArr.length-1].animations.add("swim3");
        app.main.fishArr[app.main.fishArr.length-1].play("swim3", 10, true);
        app.main.fishArr[app.main.fishArr.length-1].anchor.setTo(.5, .5);
        app.main.initializeFish(app.main.fishArr[app.main.fishArr.length-1], 20);
        app.main.fishthree.setText("Sold");
        app.main.storeArr[4] = true;
        app.main.money -= 500;
    }
}

function fishFour(item){
    if(app.main.zen)
    {
        if(app.main.money >= 0 && !app.main.storeArr[5])
        {
            app.main.fishArr.push(app.main.fishGroup.create(0, 0, "fish4"));
            app.main.fishArr[app.main.fishArr.length-1].animations.add("swim4");
            app.main.fishArr[app.main.fishArr.length-1].play("swim4", 10, true);
            app.main.fishArr[app.main.fishArr.length-1].anchor.setTo(.5, .5);
            app.main.initializeFish(app.main.fishArr[app.main.fishArr.length-1], 100);
            app.main.money -= 0;
        }
    }
    else if(app.main.money >= 10000 && !app.main.storeArr[5])
    {
        app.main.fishArr.push(app.main.fishGroup.create(0, 0, "fish4"));
        app.main.fishArr[app.main.fishArr.length-1].animations.add("swim4");
        app.main.fishArr[app.main.fishArr.length-1].play("swim4", 10, true);
        app.main.fishArr[app.main.fishArr.length-1].anchor.setTo(.5, .5);
        app.main.initializeFish(app.main.fishArr[app.main.fishArr.length-1], 100);
        app.main.fishfour.setText("Sold");
        app.main.storeArr[5] = true;
        app.main.money -= 10000;
    }
}


function setPause()
{
	if(app.main.keySpace == false){
	app.main.keySpace = true;
	app.main.pausetext = app.main.game.add.text(300,300, "PAUSE");
    app.main.pausetext.anchor.set(.5);
    app.main.pausetext.font = "Gloria Hallelujah";
    app.main.pausetext.fontSize = 100;
    app.main.pausetext.fill = '#fff';
	console.log("keySpace: " + app.main.keySpace);
	}
	else
	{
	app.main.keySpace = false;
	app.main.pausetext.destroy();
	}
	console.log("keySpace: " + app.main.keySpace);
}

function setPause()
{
	if(app.main.keySpace == false){
        app.main.overlay = true;
        app.main.keySpace = true;
        app.main.pausetext = app.main.game.add.text(300,300, "PAUSE");
        app.main.pausetext.anchor.set(.5);
        app.main.pausetext.font = "Gloria Hallelujah";
        app.main.pausetext.fontSize = 100;
        app.main.pausetext.fill = '#fff';
        console.log("keySpace: " + app.main.keySpace);
	}
	else if (app.main.keySpace)
	{
        app.main.keySpace = false;
        app.main.overlay = false;
        app.main.pausetext.destroy();
	}
}

