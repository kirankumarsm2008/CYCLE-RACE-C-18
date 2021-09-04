      var path,mainCyclist;
      var player1,player2,player3;
      var pathImg,mainRacerImg1,mainRacerImg2;

      var oppPink1Img,oppPink2Img;
      var oppYellow1Img,oppYellow2Img;
      var oppRed1Img,oppRed2Img;
      var gameOverImg,cycleBell;

      var pinkCG, yellowCG,redCG; 

      var obst1,obst2,obst3;

      var obstG;

      var END =0;
      var PLAY =1;
      var gameState = PLAY;

      var distance=0;
      var gameOver, restart;

      function preload(){

      pathImg = loadImage("Road.png");
      mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
      mainRacerImg2= loadAnimation("mainPlayer3.png");
      
      oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
      oppPink2Img = loadAnimation("opponent3.png");
      
      oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
      oppYellow2Img = loadAnimation("opponent6.png");
      
      oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
      oppRed2Img = loadAnimation("opponent9.png");
      
      cycleBell = loadSound("bell.mp3");
      gameOverImg = loadImage("gameOver.png");

      obst1 = loadImage("obstacle1.png");

      obst2 = loadImage("obstacle2.png");

      obst3 = loadImage("obstacle3.png");
      }

      function setup(){
        
      createCanvas(1200,300);
      // Moving background
      path=createSprite(100,150);
      path.addImage(pathImg);
      path.velocityX = -5;

      //creating boy running
      mainCyclist  = createSprite(70,150);
      mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
      mainCyclist.scale=0.07;
        
      //set collider for mainCyclist
      mainCyclist.setCollider("circle",0,0,50)

        
      gameOver = createSprite(650,150);
      gameOver.addImage(gameOverImg);
      gameOver.scale = 0.8;
      gameOver.visible = false;  
        
      pinkCG = new Group();
      yellowCG = new Group();
      redCG = new Group();
        
      }

      function draw() {
      background(0);
      
      drawSprites();
      textSize(20);
      fill(255);
      text("Distance: "+ distance,900,30);
      
      if(gameState===PLAY){
        
      distance = distance + Math.round(getFrameRate()/50);
      path.velocityX = -(6 + 2*distance/150);
      
      mainCyclist.y = World.mouseY;
      
      edges= createEdgeSprites();
      mainCyclist .collide(edges);
      
      //code to reset the background
      if(path.x < 0 ){
      path.x = width/2;
      }
  
     //code to play cycle bell sound
      if(keyDown("space")) {
      cycleBell.play();
      }
  
      //creating continous opponent players
      var select_oppPlayer = Math.round(random(1,3));
      
      if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
      pinkCyclists();
      } else if (select_oppPlayer == 2) {
      yellowCyclists();
      } else {
      redCyclists();
      }
      }
  
     if(pinkCG.isTouching(mainCyclist)){ 
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
     }
    
     if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
     }
    
     if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
     }
    
     }else if (gameState === END) {
     gameOver.visible = true;

     //Add code to show restart game instrution in text here
     fill("yellow");
     textSize(25);
     text("PRESS UP ARROW TO RESTART THE GAME",450,250);
  
      path.velocityX = 0;
      mainCyclist.velocityY = 0;
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    
      pinkCG.setVelocityXEach(0);
      pinkCG.setLifetimeEach(-1);
    
      yellowCG.setVelocityXEach(0);
      yellowCG.setLifetimeEach(-1);
    
      redCG.setVelocityXEach(0);
      redCG.setLifetimeEach(-1);

     //write condition for calling reset( )
     if(keyDown(UP_ARROW)){
     reset();
     }

     }

     }

      function pinkCyclists(){
      player1 =createSprite(1100,Math.round(random(50, 250)));
      player1.scale =0.06;
      player1.velocityX = -(6 + 2*distance/150);
      player1.addAnimation("opponentPlayer1",oppPink1Img);
      player1.setLifetime=170;
      pinkCG.add(player1);
      }

      function yellowCyclists(){
      player2 =createSprite(1100,Math.round(random(50, 250)));
      player2.scale =0.06;
      player2.velocityX = -(6 + 2*distance/150);
      player2.addAnimation("opponentPlayer2",oppYellow1Img);
      player2.setLifetime=170;
      yellowCG.add(player2);
      }

      function redCyclists(){
      player3 =createSprite(1100,Math.round(random(50, 250)));
      player3.scale =0.06;
      player3.velocityX = -(6 + 2*distance/150);
      player3.addAnimation("opponentPlayer3",oppRed1Img);
      player3.setLifetime=170;
      redCG.add(player3);
      }

      function obstacles(){
      if(frameCount % 80 === 0){  
      var obstacle = createSprite(1200,200,10,40);
      obstacle.velocityX = -(6 + distance/100);
      
      var randnum = Math.round(random(1,3));
      switch(randnum){
      case 1: obstacles.addImage(obst1);
      break;
      case 2: obstacles.addImage(obst2);
      break;
      case 3: obstacles.addImage(obst3);
      break;
      default: break;
      }
      obstacles.scale = 0.3;
      obstacles.lifetime = 450;

      obstG.add(obstacles)
      }
      }

     function reset(){
 
      //create reset function here
      distance = 0;

      gameState =  PLAY;

      gameOver.visible = false;
       
      mainCyclist.addAnimation("SahilRunning",mainRacerImg1);

      redCG.destroyEach();
      pinkCG.destroyEach();
      yellowCG.destroyEach();


     }
     





