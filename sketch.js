// Twomey EMAR161 SP21, adapted from:
//Modified into a game by Caleb Kirilov

let myCircle;
let myPlayer;
let myBase;

// have something happen at a certain time
//timers with millis
let startTime;
let whenShouldItHappen = 1.7; //seconds
let whenItShouldDisapear = 3.0;

//Progression counter
var counter = 1;

//BATTLE VARIABLES
//let Battle;

var TURN = 0;

//for evan's exhaust
let addNextTurn = false;

var moveSelect;

var waitForReleased = false;

let carlMove = ["Lightning", "Astral Arms"];
var carlHP = 240;
var carlPP = 81;
var carlDAM;
var carlDead;

let cassieMove = ["Stomp", "Heal"];
var cassieHP = 140;
var cassieDAM;
var cassieDead;

let evanMove = ["Zoom Kick", "Exhaust"];
var evanHP = 80;
var evanDAM = 30;
var evanDead;

let terenceMove = ["Cleaver", "Dark Shroud"];
var terenceHP = 107;
var terencePP = 40;
var terenceDAM;
var terenceDead;
// var terenceShroud = ['1','2','3','4'];

let gMove = ["Stab", "Roundhouse", "Box", "Burn"];
var gHP = 750;
var gDAM;
var gDead;
// let gturn = ['1','2','3','4'];

//background map variables
var bgdx = -1000;
var bgdy = 0;

// Companion lerp follow variables
var lastPressed;

var PaulaX = 0;
var PaulaY = 0;

var JeffX = 0;
var JeffY = 0;

var PooX = 0;
var PooY = 0;


function preload() {

  //INTRO
  //intro gif
  introGif = loadImage('assets/Intro/intro.gif');
  introMus = loadSound('assets/Intro/ElementMusicIntro.mp3');

  //Menu
  menu = loadImage('assets/Menu/menu.png');
  menuMus = loadSound('assets/Menu/menuMus.mp3');

  //OVERWORLD
  //Soundtrack
  ElementOverworld = loadSound('assets/fourside.mp3');
  //Background
  bgd = loadImage('assets/bgdG.png');

  //Carl sprites
  //Static
  CarlSD = loadImage('assets/Carl/CarlSL.png');
  CarlSU = loadImage('assets/Carl/CarlSU.png');
  CarlSL = loadImage('assets/Carl/CarlSL.png');
  CarlSR = loadImage('assets/Carl/CarlSR.png');
  //Walking
  CarlWU = loadImage('assets/Carl/CarlWU.gif');
  CarlWL = loadImage('assets/Carl/CarlWL.gif');
  CarlWR = loadImage('assets/Carl/CarlWR.gif');
  CarlWD = loadImage('assets/Carl/CarlWL.gif');

  //Cassie Sprites
  //Static
  CassieSD = loadImage('assets/Cassie/CassieSL.png');
  CassieSU = loadImage('assets/Cassie/CassieSU.png');
  CassieSL = loadImage('assets/Cassie/CassieSL.png');
  CassieSR = loadImage('assets/Cassie/CassieSR.png');
  //Walking
  CassieWU = loadImage('assets/Cassie/CassieWU.gif');
  CassieWL = loadImage('assets/Cassie/CassieWL.gif');
  CassieWR = loadImage('assets/Cassie/CassieWR.gif');
  CassieWD = loadImage('assets/Cassie/CassieWL.gif');

  //Evan Sprites
  //Static
  EvanSD = loadImage('assets/Evan/EvanSL.png');
  EvanSU = loadImage('assets/Evan/EvanSU.png');
  EvanSL = loadImage('assets/Evan/EvanSL.png');
  EvanSR = loadImage('assets/Evan/EvanSR.png');
  //Walking
  EvanWU = loadImage('assets/Evan/EvanWU.gif');
  EvanWL = loadImage('assets/Evan/EvanWL.gif');
  EvanWR = loadImage('assets/Evan/EvanWR.gif');
  EvanWD = loadImage('assets/Evan/EvanWL.gif');

  //Cassie Sprites
  //Static
  TerenceSD = loadImage('assets/Terence/TerenceSL.png');
  TerenceSU = loadImage('assets/Terence/TerenceSU.png');
  TerenceSL = loadImage('assets/Terence/TerenceSL.png');
  TerenceSR = loadImage('assets/Terence/TerenceSR.png');
  //Walking
  TerenceWU = loadImage('assets/Terence/TerenceWU.gif');
  TerenceWL = loadImage('assets/Terence/TerenceWL.gif');
  TerenceWR = loadImage('assets/Terence/TerenceWR.gif');
  TerenceWD = loadImage('assets/Terence/TerenceWL.gif');

  //Glitterman Sprites
  GlittermanOverworld = loadImage('assets/Glitterman/GlittermanOverworld.png');

  //Battle
  encounter = loadSound('assets/battle/encounter.mp3');
  swirl = loadImage('assets/battle/swirl.gif');
  GlittermanBattle = loadImage('assets/Glitterman/GlittermanBattle.png');
  battleBG = loadImage('assets/battle/battle.gif');
  battleMus = loadSound('assets/battle/battle.mp3');

  CarlHUD = loadImage('assets/battle/turns/CarlHUD.png');
  CassieHUD = loadImage('assets/battle/turns/CassieHUD.png');
  EvanHUD = loadImage('assets/battle/turns/EvanHUD.png');
  TerenceHUD = loadImage('assets/battle/turns/TerenceHUD.png');
  battleTitles = loadImage('assets/battle/turns/battleTitles.png');
  carlTitle = loadImage('assets/battle/turns/carlTitle.png');
  cassieTitle = loadImage('assets/battle/turns/cassieTitle.png');
  evanTitle = loadImage('assets/battle/turns/evanTitle.png');
  terenceTitle = loadImage('assets/battle/turns/terenceTitle.png');
  glittermanTitle = loadImage('assets/battle/turns/glittermanTitle.png');
  arrow = loadImage('assets/battle/turns/arrow.png');



}


function setup() {
  createCanvas(512, 448);

  myCircle = new Circle(random(width), random(height), 50, random(-2, 2), random(-2, 2));

  myPlayer = new Player(330, 190, 20, 'green');

  myBase = new Base(random(50, 200), random(50, 200), 20, 'blue');

  //for battle
  // var TURN = 0;

  if (counter == 1) {
    introMus.play();
    print('PRESS ARROW KEY TO CONTINUE');

  } else if (counter == 3) {
    //ElementOverworld.loop() 
  }

}

function draw() {

  //print(bgdx,bgdy);

  if (counter == 1) {

    fill("OldLace");
    image(introGif, 0, 0);
    text("ELEMENT", 65, height / 2);
    textSize(80);

    if (keyIsPressed) {
      counter = 2;
      introMus.stop();
      menuMus.play();
      print('PRESS ENTER TO SELECT SAVE FILE');
    }
  }

  if (counter == 2) {
    image(menu, 0, 0);

    if (keyIsPressed) {

      if (keyCode === ENTER) {
        menuMus.stop();
        ElementOverworld.loop()
        counter = 3;
        print('PRESS THE DOWN ARROW TO ESCAPE THE TUNNEL AND FACE OFF AGAINST GLITTERMAN');
      }
    }
  } else if (counter == 3) {


    //print(mouseX, mouseY);
    //background(50);
    image(bgd, bgdx, bgdy);

    // update and show circle
    myCircle.move(myPlayer.x2, myPlayer.y2, myPlayer.size2);
    myCircle.display();

    //ENABLES KEYBOARD INPUT
    handleKeyboard(myPlayer.x2, myPlayer.y2, myPlayer.xinc2, myPlayer.yinc2);

    // update and show player
    myPlayer.collide(myCircle.x, myCircle.y, myCircle.r);
    myPlayer.display();

    // update and show player's base
    myBase.collide(myCircle.x, myCircle.y, myCircle.r);
    myBase.display();

    if (bgdx > -1350 && bgdx < -1100 && bgdy > -1830 && bgdy < -1630) {
      ElementOverworld.stop()
      //battle sound and graphic

      startTime = millis();
      counter = 4;
    }
  } else if (counter == 4) {
    //battle music start


    let timeElapsed = millis() - startTime;


    if (timeElapsed > 1.7 && timeElapsed < 3500) {
      image(swirl, 0, 0);
      encounter.play();
    }

    // is it time for spotted overworld animation?
    if ((timeElapsed > whenShouldItHappen * 1000) && (timeElapsed < whenItShouldDisapear * 1000)) {
      battleMus.loop();
      counter = 5;
    }
  } else if (counter == 5) {
    encounter.stop();
    image(battleBG, 0, 0);

    push();
    scale(0.10);
    translate(2000, 1350);
    image(GlittermanBattle, 0, 0);
    pop();

    Battle();


  }

}

class Player {
  constructor(x2, y2, size2, color2) {
    this.x2 = x2;
    this.y2 = y2;
    this.size2 = 10;
    // this.life2 = 100;
    //this.color = color2;


  }

  move(xinc2, yinc2) {
    // this.x2 += xinc2;
    this.y2 += yinc2;

    if (this.x2 < 130) {
      this.x2 = 130;
      bgdx += 4;

    } else if (this.x2 > 346) {

      this.x2 = 346;
      bgdx -= 4;


    } else {
      this.x2 += xinc2;
    }

    if (this.y2 < 100) {
      this.y2 = 100;
      bgdy += 2;

    } else if (this.y2 > 280) {

      this.y2 = 280;
      bgdy -= 2;


    } else {
      this.y2 += yinc2;
    }

  }

  collide(otherx2, othery2, otherr2) {
    if (dist(this.x2, this.y2, otherx2, othery2) < (otherr2)) {

    }

  }



  display() {

    //Companion following Lerps

    //PAULA
    PaulaX = lerp(PaulaX, this.x2, 0.05);
    PaulaY = lerp(PaulaY, this.y2, 0.05);

    if (keyIsPressed) {

      if (keyCode === UP_ARROW) {
        // image(PaulaStaticD,PaulaX, PaulaY + 50); 
        PaulaY += (200 > 150 && 200 < 201)

        lastPressed = 'UP';
      } else if (keyCode === DOWN_ARROW) {
        // image(PaulaStaticD,PaulaX, PaulaY - 50);
        PaulaY -= (25 > 100 && 100 > 120)

        lastPressed = 'DOWN';

      } else if (keyCode === RIGHT_ARROW) {
        // image(PaulaStaticD,PaulaX - 50, PaulaY);
        PaulaX -= (200 > 150 && 200 < 201)

        lastPressed = 'RIGHT';

      } else if (keyCode === LEFT_ARROW) {
        // image(PaulaStaticD,PaulaX + 50, PaulaY);
        PaulaX += (200 > 150 && 200 < 201)

        lastPressed = 'LEFT';
      }
    } else {
      if (lastPressed == 'UP') {
        PaulaY += (200 > 150 && 200 < 201)

      } else if (lastPressed == 'DOWN') {
        PaulaY -= (200 > 150 && 200 < 201)

      } else if (lastPressed == 'RIGHT') {
        PaulaX -= (200 > 150 && 200 < 201)

      } else if (lastPressed == 'LEFT') {
        PaulaX += (200 > 150 && 200 < 201)
      }
    }

    //JEFF
    JeffX = lerp(JeffX, PaulaX, 0.05);
    JeffY = lerp(JeffY, PaulaY, 0.05);

    if (keyIsPressed) {

      if (keyCode === UP_ARROW) {
        JeffY += (200 > 150 && 200 < 201)

        lastPressed = 'UP';
      } else if (keyCode === DOWN_ARROW) {
        JeffY -= (25 > 100 && 100 > 120)

        lastPressed = 'DOWN';

      } else if (keyCode === RIGHT_ARROW) {
        JeffX -= (200 > 150 && 200 < 201)

        lastPressed = 'RIGHT';

      } else if (keyCode === LEFT_ARROW) {
        JeffX += (200 > 150 && 200 < 201)

        lastPressed = 'LEFT';
      }
    } else {
      if (lastPressed == 'UP') {
        JeffY += (200 > 150 && 200 < 201)

      } else if (lastPressed == 'DOWN') {
        JeffY -= (200 > 150 && 200 < 201)

      } else if (lastPressed == 'RIGHT') {
        JeffX -= (200 > 150 && 200 < 201)

      } else if (lastPressed == 'LEFT') {
        JeffX += (200 > 150 && 200 < 201)
      }
    }

    //POO
    PooX = lerp(PooX, JeffX, 0.05);
    PooY = lerp(PooY, JeffY, 0.05);

    if (keyIsPressed) {

      if (keyCode === UP_ARROW) {
        PooY += (200 > 150 && 200 < 201)

        lastPressed = 'UP';
      } else if (keyCode === DOWN_ARROW) {
        PooY -= (25 > 100 && 100 > 120)

        lastPressed = 'DOWN';

      } else if (keyCode === RIGHT_ARROW) {
        PooX -= (200 > 150 && 200 < 201)

        lastPressed = 'RIGHT';

      } else if (keyCode === LEFT_ARROW) {
        PooX += (200 > 150 && 200 < 201)

        lastPressed = 'LEFT';
      }
    } else {
      if (lastPressed == 'UP') {
        PooY += (200 > 150 && 200 < 201)

      } else if (lastPressed == 'DOWN') {
        PooY -= (200 > 150 && 200 < 201)

      } else if (lastPressed == 'RIGHT') {
        PooX -= (200 > 150 && 200 < 201)

      } else if (lastPressed == 'LEFT') {
        PooX += (200 > 150 && 200 < 201)
      }
    }

    //LOAD ORDER OF CHARACTERS FOR IMMERSION
    if (keyIsPressed) {

      if (keyCode === UP_ARROW) {
        image(CarlWU, this.x2, this.y2);
        image(CassieWU, PaulaX, PaulaY);
        image(EvanWU, JeffX, JeffY);
        image(TerenceWU, PooX, PooY);


      } else if (keyCode === DOWN_ARROW) {
        image(TerenceWD, PooX, PooY);
        image(EvanWD, JeffX, JeffY);
        image(CassieWD, PaulaX, PaulaY);
        image(CarlWD, this.x2, this.y2);

      } else if (keyCode === RIGHT_ARROW) {
        image(TerenceWR, PooX, PooY);
        image(EvanWR, JeffX, JeffY);
        image(CassieWR, PaulaX, PaulaY);
        image(CarlWR, this.x2, this.y2);

      } else if (keyCode === LEFT_ARROW) {
        image(TerenceWL, PooX, PooY);
        image(EvanWL, JeffX, JeffY);
        image(CassieWL, PaulaX, PaulaY);
        image(CarlWL, this.x2, this.y2);
        //NessWalkingL.position(this.x2,this.y2);
      }
    } else {
      if (lastPressed == 'UP') {
        image(CarlSU, this.x2, this.y2);
        image(CassieSU, PaulaX, PaulaY);
        image(EvanSU, JeffX, JeffY);
        image(TerenceSU, PooX, PooY);

      } else if (lastPressed == 'DOWN') {
        image(TerenceSD, PooX, PooY);
        image(EvanSD, JeffX, JeffY);
        image(CassieSD, PaulaX, PaulaY);
        image(CarlSD, this.x2, this.y2);

      } else if (lastPressed == 'RIGHT') {
        image(TerenceSR, PooX, PooY);
        image(EvanSR, JeffX, JeffY);
        image(CassieSR, PaulaX, PaulaY);
        image(CarlSR, this.x2, this.y2);

      } else if (lastPressed == 'LEFT') {
        image(TerenceSL, PooX, PooY);
        image(EvanSL, JeffX, JeffY);
        image(CassieSL, PaulaX, PaulaY);
        image(CarlSL, this.x2, this.y2);
      }
    }
  }

}

class Base {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    // this.size = 20;
    // this.life = 100;
    this.color = color;
  }


  collide(otherx, othery, otherr) {
    if (dist(this.x, this.y, otherx, othery) < (otherr)) {
      //this.color = 'red';
      //POINTS GO DOWN AND CROSSHAIR TURNS RED
      //this.life -= 1;
      //soundfile3.play();
      push();
      translate(-62, -50);
      //image(hrtblk, this.x, this.y);
      pop();


      //IF LIFE GOES TO ZERO ITS GAME OVER
      if (this.life <= 0) {
        // fill(128, 0, 0, 100);
        // rect(0, 0, width, height);
        //textAlign(CENTER);
        //textSize(32);
        // fill('lightBlue');
        // text("GAME OVER", width / 2, height / 2);
        // soundfile6.stop();
        // soundfile.play();
        // soundfile7.play();
        //print("Thanks for playing, try again?")
        //noLoop();
      }
    } else {
      //this.color = 'blue';
      push();
      translate(-62, -50);
      //image(hrt, this.x, this.y);
      pop();
    }
  }

  display() {
    // draw crosshair shape
    // strokeWeight(10);
    // stroke(this.color)
    // line(this.x - this.size, this.y, this.x + this.size, this.y);
    // line(this.x, this.y - this.size, this.x, this.y + this.size);
    // strokeWeight(1);

    // draw life
    //fill(128,0,0);
    // textSize(24);
    // text(this.life, 20, 20);
  }
}

class Circle {
  constructor(x, y, r, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.r = 50;
    // this.xSpeed = xSpeed;
    // this.ySpeed = ySpeed;
    this.color = color(255, 255, 255);
    this.bounce = 0;
  }

  move(otherx2, othery2, otherr2) {
    this.x += this.xSpeed;
    if (this.x < 0 || this.x > width || this.x == this.x2) {
      this.xSpeed *= -1;
      this.color = color(random(255), random(255), random(255));
      //this.bounce += 1;
      //soundfile4.play();
    }

    this.y += this.ySpeed;
    if (this.y < 0 || this.y > height || this.y == this.y2) {
      this.ySpeed *= -1;
      this.color = color(255, 255, 255);
      //this.bounce += 1;
      //soundfile4.play();
    }

    // Collision with  bouncer
    if (dist(this.x, this.y, otherx2, othery2) < (otherr2)) {
      //BALL BOUNCES AWAY AND CROSSHAIR TURNS WHITE
      //soundfile2.play();
      // this.ySpeed *= -1.1;
      // this.xSpeed *= -1.1;
    }

    //fill('white');
    //text(this.bounce, 20, 40);
    if (this.bounce >= 300) {
      //fill(0, 0, 0, 100);
      //rect(0, 0, width, height);
      // textAlign(CENTER);
      // textSize(32);
      fill('yellow');
      //text("YOU'RE WINNER", width / 2, height / 2);
      // soundfile6.stop();
      // soundfile5.play();
      print("Thanks for playing!");
      push();
      scale(0.3);
      //image(yw,200,180);
      pop();
      //noLoop();
    }
  }


  display() {
    // noStroke();
    // fill(this.color);
    // circle(this.x, this.y, this.r);

    push();
    translate(-16.5, -16.5);
    //image(jar, this.x, this.y);
    pop();
  }

  // setColor(newcolor) {
  //   this.color = newcolor;
  // }
}

function handleKeyboard() {
  if (keyIsPressed) {

    if (keyCode === UP_ARROW) {
      myPlayer.move(0, -1);

    } else if (keyCode === DOWN_ARROW) {
      myPlayer.move(0, 1);

    } else if (keyCode === RIGHT_ARROW) {
      myPlayer.move(2, 0);

    } else if (keyCode === LEFT_ARROW) {
      myPlayer.move(-2, 0);
    } else {
      if (lastPressed == 'UP') {

      } else if (lastPressed == 'DOWN') {

      } else if (lastPressed == 'RIGHT') {

      } else if (lastPressed == 'LEFT') {}
    }
  }
}




function Battle() {

  let CarlHUDy = 0;
  let CassieHUDy = 0;
  let EvanHUDy = 0;
  let TerenceHUDy = 0;

  // TURN = TURN+1;
  // TURN = 1;

  // if (keyCode === DOWN_ARROW) {
  //   TURN = 1;
  // }


  if (TURN == 0) {
    push();
    image(glittermanTitle, 0, 0);
    fill(255);
    textSize(15);
    text("'You're the new contestants on my show,", 115, 50);
    text("famous last words!'", 190, 70);
    text("(PRESS ENTER TO CONTINUE)", 145, 95);
    pop();

    if (keyIsPressed) {
      if (keyCode === ENTER) {
        TURN = 1;
      }

    }
  }

  if (TURN == 1) {
    CarlHUDy = 20;
  }

  if (TURN == 2) {
    CassieHUDy = 20;
  }

  if (TURN == 3) {
    EvanHUDy = 20;
  }

  if (TURN == 4) {
    TerenceHUDy = 20;
  }

  if (TURN == 5) {}


  image(CarlHUD, 0, -CarlHUDy);
  image(CassieHUD, 0, -CassieHUDy);
  image(EvanHUD, 0, -EvanHUDy);
  image(TerenceHUD, 0, -TerenceHUDy);

  fill(0);
  text(carlHP, 90, (375 - CarlHUDy));
  text(carlPP, 90, (408 - CarlHUDy));

  text(cassieHP, 202, (375 - CassieHUDy));
  text('0', 202, (408 - CassieHUDy));

  text(evanHP, 315, (375 - EvanHUDy));
  text('0', 315, (408 - EvanHUDy));

  text(terenceHP, 425, (375 - TerenceHUDy));
  text(terencePP, 425, (408 - TerenceHUDy));

  // text(gHP, 250, 200);
  // text(evanDAM, 300, 300);
  textSize(20);

  //CARL TURN
  if (TURN == 1 && waitForReleased == false) {
    
    if (gHP <= 0) {
      TURN = 7;
    } else{
    
    if (carlHP <= 0) {
      carlHP = 0;
      TURN = 2;
    } else {
      
    image(carlTitle, 0, 0);

    push();
    fill(255);
    textSize(15);
    text('Choose attack for Carl', 175, 50);
    text('Lightning - 15PP', 140, 80);
    text('Astral Arms', 300, 80);
    pop();

    var carlChoose;
    let arrowX;
    let arrowY = 70;

    if (keyIsPressed) {
      if (keyCode === LEFT_ARROW) {
        // carlChoose = 'Lightning';
        arrowX = 130;
        image(arrow, arrowX, arrowY);
        
        if (carlPP == 0 || carlPP <= 14) {
          TURN = 2;
          waitForReleased = true;
        } else {
        
        carlDAM = 25;
        gHP -= carlDAM;
        carlPP -= 15;
        waitForReleased = true;
        TURN = 2;
      }
      }

      if (keyCode === RIGHT_ARROW) {
        // carlChoose = 'Astral Arms';
        arrowX = 280;
        image(arrow, arrowX, arrowY);
        carlDAM = 10;
        gHP -= carlDAM;
        waitForReleased = true;
        TURN = 2;

      }
    }
    }
    }

  } //CASSIE TURN
  if (TURN == 2 && waitForReleased == false) {
    
    if (gHP <= 0) {
      TURN = 7;
    } else{
    
    if (cassieHP <= 0) {
      cassieHP = 0;
      TURN = 3;
    } else {
    
    image(cassieTitle, 0, 0);

    push();
    fill(255);
    textSize(15);
    text('Choose attack for Cassie', 175, 50);
    text('Stomp', 150, 80);
    text('Heal', 320, 80);
    pop();

    // var cassieChoose;
    let arrowX;
    let arrowY = 70;

    if (keyIsPressed) {
      if (keyCode === LEFT_ARROW) {
        // carlChoose = 'Lightning';
        arrowX = 130;
        image(arrow, arrowX, arrowY);
        cassieDAM = 10;
        gHP -= cassieDAM;
        waitForReleased = true;
        TURN = 3;
      }

      if (keyCode === RIGHT_ARROW) {
        // carlChoose = 'Astral Arms';
        arrowX = 280;
        image(arrow, arrowX, arrowY);
        carlHP += 5;
        cassieHP += 5;
        evanHP += 5;
        terenceHP += 5;
        waitForReleased = true;
        TURN = 3;

      }
    }
    }
    }

  } //EVAN TURN
  if (TURN == 3 && waitForReleased == false) {
    
    if (gHP <= 0) {
      TURN = 7;
    } else{
    
    if (evanHP <= 0) {
      evanHP = 0;
      TURN = 4;
    } else {
    
    image(evanTitle, 0, 0);

    push();
    fill(255);
    textSize(15);
    text('Choose move for Evan', 175, 50);
    text('Zoom Kick', 140, 80);
    text('Exhaust', 300, 80);
    text('(+ damage next turn)', 260, 95);
    pop();

    // var cassieChoose;
    let arrowX;
    let arrowY = 70;

    if (keyIsPressed) {
      if (keyCode === LEFT_ARROW) {
        // carlChoose = 'Zoom Kick';
        arrowX = 130;
        image(arrow, arrowX, arrowY);
        gHP -= evanDAM;
        waitForReleased = true;

        TURN = 4;
      }

      if (keyCode === RIGHT_ARROW) {
        // carlChoose = 'Exhaust';
        arrowX = 280;
        image(arrow, arrowX, arrowY);
        // carlPP += 3;
        // terencePP += 3;
        waitForReleased = true;
        evanDAM += 5;
        TURN = 4;
      }
    }
    }
    }
  } //Terence TURN
  if (TURN == 4 && waitForReleased == false) {
    
    if (gHP <= 0) {
      TURN = 7;
    } else{
    
    if (terenceHP <= 0) {
      terenceHP = 0;
      TURN = 5;
    } else {
    
    image(terenceTitle, 0, 0);

    push();
    fill(255);
    textSize(15);
    text('Choose move for Terence', 175, 50);
    text('Cleaver', 140, 80);
    text('Dark Shroud - 10PP', 280, 80);
    pop();

    // var cassieChoose;
    let arrowX;
    let arrowY = 70;

    if (keyIsPressed) {
      if (keyCode === LEFT_ARROW) {
        // terenceChoose = 'Cleaver';
        arrowX = 130;
        image(arrow, arrowX, arrowY);
        terenceDAM = 15;
        gHP -= terenceDAM;
        waitForReleased = true;
        TURN = 5;
      }

      if (keyCode === RIGHT_ARROW) {
        // carlChoose = 'Dark Shroud';
        arrowX = 280;
        image(arrow, arrowX, arrowY);
        

        if (terencePP == 0 || terencePP <= 9) {
          TURN = 5;
        } else {
          
        //rolling the 1/4 die to see if Dark Shroud is effective
        var terenceShroud = ceil(random(4));
        terencePP -= 10;

        if (terenceShroud == 4) {
          print("Dark Shroud was effective and blinded Glitterman!");
          waitForReleased = true;
          TURN = 1;
        } else {
          print("Dark Shroud was not effective and it's Glitterman's turn!");
          waitForReleased = true;
          TURN = 5;
        }
        }
      }
      }
      }
    }
  }

  //GLITTERMAN TURN
  if (TURN == 5 && waitForReleased == false) {
    
    if (gHP <= 0) {
      TURN = 7;
    } else{
    
    if (carlHP <= 0 && cassieHP <= 0 && evanHP <= 0 && terenceHP <= 0) {
      TURN = 6;
    } else {
    
    
    image(glittermanTitle, 0, 0);
    
    push();
    fill(255);
    textSize(15);
    text("Nice try, now it's my turn!", 175, 50);
    pop();

    if (keyIsPressed) {
      if (keyCode === ENTER) {
        
        var gturn = ceil(random(4));


        if (gturn == 1) {
          print('Glitterman used Stab!');
          

          carlHP -= 10;
          cassieHP -= 10;
          evanHP -= 10;
          terenceHP -= 10;
        }

        if (gturn == 2) {
          print('Glitterman used Roundhouse!');

          carlHP -= 30;
          cassieHP -= 30;
          evanHP -= 30;
          terenceHP -= 30;
        }

        if (gturn == 3) {
          print('Glitterman used Box!');

          carlHP -= 5;
          cassieHP -= 5;
          evanHP -= 5;
          terenceHP -= 5;
        }

        if (gturn == 4) {
          print('Glitterman used Burn!');

          carlHP -= 15;
          cassieHP -= 15;
          evanHP -= 15;
          terenceHP -= 15;
        }


        if (keyIsPressed) {
          if (keyCode === ENTER) {
            waitForReleased = true;
            TURN = 1;
          }
        }
        }
      }
    }
    }
      }
  
  if (TURN == 6) {
    print('GAME OVER');
    print('Try as you might, you could not overcome this obstacle,');
    print('perhaps in another life.');
    noLoop();
  }
  
  if (TURN == 7) {
    print('VICTORY!');
    print('The evil game show host has been defeated and you are one step closer now');
    print('TO BE CONTINUED... in another game')
    noLoop();
  }
  

    }

    function keyReleased() {
      waitForReleased = false;

    }