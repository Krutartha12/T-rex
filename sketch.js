var jumpSound;
var dieSound;
var checkpointSound;
var trex, trex_running, edges;
var groundImage;
var ground;
var invisibleGround;
var cloud;
var cloudImage;
var ob1,ob2,ob3,ob4,ob5,ob6,ob6;
var score;
var cloudGroup,obstacleGroup;
var gameState;
var trexCollide;
var restart;
var gameover;
var restartImage;
var gameoverImage;
var bG;
var v = 50;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage ("cloud.png");
  
  ob1 = loadImage ("obstacle1.png");
  ob2 = loadImage ("obstacle2.png");
  ob3 = loadImage ("obstacle3.png");
  ob4 = loadImage ("obstacle4.png");
  ob5 = loadImage ("obstacle5.png");
  ob6 = loadImage ("obstacle6.png");
  
  trexCollide = loadAnimation("trex0.png");
  restartImage= loadAnimation("restart.png");
  gameoverImage = loadAnimation("gameOver.png");
  
  checkpointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
}



function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trexCollide);
  edges = createEdgeSprites();
  
  gameover= createSprite(250,70,5,5);
  restart = createSprite(250,150,5,5);
  
  restart.scale = 0.5
  gameover.scale = 0.8;
  
  gameover.addAnimation("gameOver",gameoverImage);
  restart.addAnimation("restart",restartImage);
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  invisibleGround = createSprite(200,190,4000,5);
  invisibleGround.visible = false
  
  //trex.debug = truee;
  //creating ground
  
  trex.setCollider("rectangle",0,0,40,50)
  score = 0;
  
  ground = createSprite(200,180,4000,5);
  ground.addImage("ground",groundImage)
  
  textSize(20);
  
  cloudGroup = createGroup();
  obstacleGroup = new Group();
  
  gameState = "play";
  
  bG = "lightgrey";
}


function draw(){
  //set background color 
  if (score%500===0){
    if(bG === "lightgrey"){
      bG = "white";
    }else {
      bG = "lightgrey";
    }
  }
  background(bG);
  //trex.velocityX = 5;
  text ("Score: " + score,500,30);
   
  if(gameState==="play"){
   
    gameover.visible = false;
    restart.visible = false;
    
 // console.log(getFrameRate());
  //score = score + Math.round(getFrameRate()/30);
  
 // score = Math.round( score + 0.5);
  
    score =score + Math.ceil(0.1);
      if(score>0 && score % 500 === 0 ){
        checkpointSound.play();
      }
  showCloud();
  ground.velocityX = -(6+2*score/250);
  
  
  
  if (ground.x<0){
    ground.x = ground.width/2; 
  }
  //logging the y position of the trex
  //console.log(trex.y)
  
  //jump when space key is pressed
  if(keyDown("space") && trex.y>159){
    trex.velocityY = -15;
    jumpSound.play();
  }
  
  trex.velocityY = trex.velocityY + 1.4;
  
  showObstacles();
    
    if(trex.isTouching(obstacleGroup)){
      dieSound.play();
      gameState = "end" ;
    }
  }
  else{
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    trex.velocityY = 0;
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("collide",trexCollide);
    gameover.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
gameState = "play";
      obstacleGroup.destroyEach();
      cloudGroup.destroyEach();
      trex.changeAnimation("running", trex_running);
      score = 0;
    }
  }
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
 // speedIncrease();
  
  drawSprites();
}

function showCloud(){
  if(World.frameCount%50===0){
    cloud = createSprite(650,random(1,100),5,5);
    cloud.velocityX = -5;
    cloud.addImage(cloudImage);
    cloud.scale = 0.75;
    //cloud.debug = true;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
    cloudGroup.setLifetimeEach(150);
    
  }
}

function showObstacles(){
  
  if (score%10===0){
  var a = Math.round( random (1,3));
    console.log(a)
    switch(a){
      case 1 : v = 10; break
      case 2 : v = 50; break 
     case 3 : v = 100; break 
    }
  }
  
  if(World.frameCount%v===0){
    obstacle = createSprite(650,170,50,50);
    obstacle.velocityX = -(6+2*score/250);
    obstacle.scale = 0.5;
    //cloud.debug = true;
   //obstacle.debug = true;
  if (score <= 500){
    
  
    var number = Math.round(random(1,2))
    switch (number){
      case 1 : obstacle.addImage("ob1",ob1); break;
      case 2 : obstacle.addImage("ob2",ob2); break;
       case 3 : obstacle.addImage("ob3",ob3); break;
      case 4 : obstacle.addImage("ob4",ob4); break;
       case 5 : obstacle.addImage("ob5",ob5); break;
      case 6 : obstacle.addImage("ob6",ob6); break;
    }
    }
    if (score => 500 && score <= 1000){
    
  
    var number1 = Math.round(random(3,4))
    switch (number1){
      case 1 : obstacle.addImage("ob1",ob1); break;
      case 2 : obstacle.addImage("ob2",ob2); break;
       case 3 : obstacle.addImage("ob3",ob3); break;
      case 4 : obstacle.addImage("ob4",ob4); break;
       case 5 : obstacle.addImage("ob5",ob5); break;
      case 6 : obstacle.addImage("ob6",ob6); break;
    }
    }
    if (score => 1000 && score <= 2000){
    
  
    var number2 = Math.round(random(5,6))
    switch (number2){
      case 1 : obstacle.addImage("ob1",ob1); break;
      case 2 : obstacle.addImage("ob2",ob2); break;
       case 3 : obstacle.addImage("ob3",ob3); break;
      case 4 : obstacle.addImage("ob4",ob4); break;
       case 5 : obstacle.addImage("ob5",ob5); break;
      case 6 : obstacle.addImage("ob6",ob6); break;
    }
    }
    if (score => 2000){
    
  
    var number3 = Math.round(random(1,6))
    switch (number3){
      case 1 : obstacle.addImage("ob1",ob1); break;
      case 2 : obstacle.addImage("ob2",ob2); break;
       case 3 : obstacle.addImage("ob3",ob3); break;
      case 4 : obstacle.addImage("ob4",ob4); break;
       case 5 : obstacle.addImage("ob5",ob5); break;
      case 6 : obstacle.addImage("ob6",ob6); break;
    }
    }
    
    obstacle.lifetime = 150;
 obstacleGroup.add(obstacle);
  }
  
}
     
