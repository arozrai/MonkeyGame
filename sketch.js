
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var Time
var PLAY=1
var END=0
var gamo

function preload(){
  
  well=loadImage("obstacle.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  monkey=createSprite(100,300,50,50)
  monkey.addAnimation("RUN",monkey_running)
  monkey.scale=0.1
  
  FoodGroup=new Group()
  obstacleGroup=new Group()

  ground=createSprite(400,350,900,10)
  ground.visible=false
  ground.velocityX=-4
  ground.x=ground.width/2
  console.log(ground.x)
  
  score=0
  Time=0
  
  gamo=PLAY
}


function draw() {
  background("white")
  if (gamo===PLAY){
    Time=0
    Time=frameCount
    rock()
    tasty()
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
    monkey.velocityY=monkey.velocityY+0.8
    monkey.debug=true
    monkey.collide(ground)
    if (keyWentDown("space")&&monkey.y>=300){
      monkey.velocityY=-20
    }
    if (FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach()
      score=score+1
    }
    if (obstacleGroup.isTouching(monkey)){
      gamo=END
    }
  }
  if (gamo===END){
    banana.velocityX=0
    banana.lifetime=-1
    rook.velocityX=0
    rook.lifetime=-1
    text("GAME OVER press Space to start again",100,200)
    monkey.velocityY=0
    if (keyWentDown("space")){
      oof()
    }
    
  }
  
  drawSprites()
  text("Score: "+score,40,40)
  text("time: "+Time,40,50)
}

function rock(){
  if(frameCount%300===0){
    rook=createSprite(400,330,20,20)
    rook.addImage(obstaceImage)
    rook.scale=0.1
    rook.velocityX=-4
    rook.lifetime=100
    obstacleGroup.add(rook)
  }
  
}
function tasty(){
  if(frameCount%100===0){
    banana=createSprite(400,200,20,20)
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.velocityX=-4
    banana.lifetime=100
    FoodGroup.add(banana)
  }
}
function oof(){
  FoodGroup.destroyEach()
  obstacleGroup.destroyEach()
  score=0
  frameCount=0
  Time=0
  gamo=PLAY
  
}


