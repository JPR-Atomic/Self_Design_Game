
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, puddingObj,groundObject, launcherObject;
var gift1,gift2,gift3;
var world,elf;
var launchingForce=100;
var backgroundImg
var engine
var gameState = "onsling"
var counter = 0

function preload(){
	elf=loadImage("images/elf.png");

  backgroundImg=loadImage("images/background.png")

  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	puddingObj=new Pudding(235,420,40); 

	gift1=new Gift(1050,200,30);
  gift2=new Gift(1100,360,30);
  gift3=new Gift(960,470,30);

	treeObj=new Tree(1050,630);
	groundObject=new Ground(width/2,600,width,20);
	launcherObject=new Launcher(puddingObj.body,{x:235,y:420})
  // var render = Render.create({
  //   element: document.body,
  //   engine: engine,
  //   options: {
  //     width: 1300,
  //     height: 600,
  //     wireframes: false
  //   }
  // });
	
	Engine.run(engine);
 // Render.run(render);
}

function draw() {

  background(backgroundImg);
  //frameRate(2)
 // Engine.update(engine)
  textSize(25);
  fill("white");
  if (counter !== 2){
    text("Press Space to get a another chance !!",50 ,50);
  }
  if (counter === 2){
    text("Last chance!",50,50)
  }
  image(elf ,190,270,250,350);
  //Engine.update(engine)
  

  treeObj.display();
  puddingObj.display();
  gift1.display();
  gift2.display();
  gift3.display();

  groundObject.display();
  launcherObject.display();
  detectcollision(puddingObj,gift1);
  detectcollision(puddingObj,gift2);
  detectcollision(puddingObj,gift3)
}

function mouseDragged()
{
	if (gameState!=="launched")
  Matter.Body.setPosition(puddingObj.body, {x:mouseX, y:mouseY})

}

function mouseReleased()
{
	launcherObject.fly();
  gameState = "launched"
    // distance=int(dist(puddingObj.x,puddingObj.y,gift1.x,gift1.y));
}

function keyPressed() {
	if (keyCode === 32 && counter !== 2) {
    Matter.Body.setPosition(puddingObj.body, {x:235, y:420}) 
	  launcherObject.attach(puddingObj.body);
    gameState = "onsling";
    counter ++;
	}
  }

  function detectcollision(lpudding,lgift){
	/*var collision = Matter.SAT.collides(lpudding,lgift);
	if(collision.collided){
		console.log("collided");
		Matter.Body.setStatic(lgift,false);	
	}*/
  giftBodyPosition=lgift.body.position
  puddingBodyPosition=lpudding.body.position
  
  var distance=dist(puddingBodyPosition.x, puddingBodyPosition.y, giftBodyPosition.x, giftBodyPosition.y)
  //console.log(distance)
 // console.log(lmango.r+lstone.r)
  	if(distance<=lgift.r+lpudding.r)
    {
      /*if(gameState === "launched"){
        text("Congratulations you won a gift!",450,300)
      }*/
      //console.log(distance);
  	  Matter.Body.setStatic(lgift.body,false);
      
    }
   

  }