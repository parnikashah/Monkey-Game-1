var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
 monkey= createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
 
  
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  console.log(ground.x);
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("white");
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
  monkey.collide(ground);
  
  
  
   if(gameState === PLAY){
     stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
  stroke("black");
 textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50);
     
      if(keyDown("space")){
    monkey.velocityY=-7;
   }
     monkey.velocityY = monkey.velocityY + 0.3;
     if(obstacleGroup.isTouching(monkey)){
       gameState=END;
     }
     if(bananaGroup.isTouching(monkey)){
       bananaGroup.destroyEach();
     }
     
   }
   else if (gameState === END) {
     monkey.velocityY=0;
     bananaGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     ground.velocityX=0;
     
     
     textSize(15);
     text("Game Over",200,200);
     
     
   }

  
  food();
  obstacles();
  drawSprites()

  
}
function food(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
     banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime=200;
    bananaGroup.add(banana);
 
  }
  
}

function obstacles(){
  if (frameCount % 250 === 0) {
    var obstacle = createSprite(600,315,40,10);
    obstacle.x = Math.round(random(400,600));
    obstacle .addImage(obstaceImage);
    obstacle .scale = 0.1;
   obstacle .velocityX = -3;
    obstacle .lifetime=200;
    obstacleGroup.add(obstacle);
}

}




