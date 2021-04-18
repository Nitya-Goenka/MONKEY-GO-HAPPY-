var banana,bananaImage
var obstacle,obstacleImage
var bg,bgImage
var score
var obstacleGroup,bananaGroup
var monkey,monkey_running
var ground

function preload(){
  bgImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  obstacleImage=loadImage("stone.png");
  bananaImage=loadImage("banana.png");
}

function setup() {
  createCanvas(400, 400);
  bg=createSprite(100,200,20,20);
  bg.addImage(bgImage);
  bg.velocityX=-2;
  bg.x = bg.width /2;
  
  monkey=createSprite(50,370,20,20)
  monkey.addAnimation("running", monkey_running)
  monkey.scale=0.2;
  
  ground=createSprite(200,380,400,10);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  ground.visible=false;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  score=0;
}

function draw() {
  background(220);
  
  //infinte ground
  if (bg.x < 0){
    bg.x = bg.width/2;
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(ground);
  
  if(keyDown("space")) {
     monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  
  if(bananaGroup.isTouching(monkey)){
     score=score+2;
     bananaGroup.destroyEach();
  }
   
  if(obstacleGroup.isTouching(monkey)){
     monkey.scale=0.2;
  }
  
  switch(score){
    case 10 : monkey.scale=0.22;
             break;
    case 20 : monkey.scale=0.24;
             break; 
    case 30 : monkey.scale=0.26;
             break;
    case 40 : monkey.scale=0.28;
             break;
    default : break;         
  }
  
  spawnBanana();
  spawnObstacle();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE: "+ score,25,40);
}

function spawnBanana() {
  if(World.frameCount % 80 === 0) {
    var banana = createSprite(400,365,10,40);
    banana.addImage("Banana",bananaImage);
    banana.y= random(120,200);
    banana.velocityX= -5;         
    banana.scale = 0.05;
    banana.lifetime = 100;
    //add each obstacle to the group
    bananaGroup.add(banana);
  } 
}

function spawnObstacle() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,345,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage("Stone",obstacleImage);
    obstacle.scale = 0.17;
    obstacle.lifetime = 70;
    obstacleGroup.add(obstacle);
  }
}