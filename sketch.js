var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var pontos=0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.play();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
 ghost=createSprite(200,200,50,50);
 ghost.addImage(ghostImg);
 ghost.scale=0.3;

}

function draw() {
  background('black');
  if(gameState==='play'){
  pontos+=Math.round(frameRate()/60);

  if(tower.y > 400){
      tower.y = 300
    }

    portas();
    drawSprites();
    textSize(24);
       fill('red');
    text(pontos,20,30);
    if(keyDown('space')){
      ghost.velocityY=-10;
    }
    ghost.velocityY+=1;
    if(keyDown('right')){
      ghost.x+=3;
    }
    if(keyDown('left')){
      ghost.x-=3;
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      gameState='gameover';
    }
  }
     if(gameState==='gameover'){
       textSize(24);
       fill('red');
       text("game over",230,250);
       text(pontos,20,30);
     }
}
function portas(){
 if(frameCount%240===0){
   door=createSprite(200,-50);
   door.addImage(doorImg)
   door.velocityY=1;
  door.x=Math.round(random(120,400));
  door.lifetime=800;
  doorsGroup.add(door);
 
  climber=createSprite(200,10);
   climber.addImage(climberImg)
   climber.velocityY=1;
  climber.x=door.x;
  climber.lifetime=800;
  climbersGroup.add(climber);
  ghost.depth=door.depth;
  ghost.depth+=1;

  invisibleBlock=createSprite(200,15,climber.width,2);
  invisibleBlock.x=door.x;
  invisibleBlock.velocityY=1;
  invisibleBlock.visible=false;
  invisibleBlockGroup.add(invisibleBlock);
  
 }
}

