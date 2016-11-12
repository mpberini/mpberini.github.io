"use strict";
var C = {
  "game": {
    "width":320,
    "height": 568
  },
  "bg": {
    "width": 320,
    "height": 1704,
    "xspeed": 0,
    "yspeed": 400,
    "file": "background.png"
  },
  "p": {
    "file": "player.png",
    "width": 46,
    "height": 64,
    "frames":2,
    "fps":2,
    "startx": 160,
    "starty": 500,
    "bounce": 0.3,
    "speed": 5
  },
  "d": {
    "file": "batarang.png",
    "width": 64,
    "height": 29,
    "frames": 5,
    "fps": 10,
    "startx": 160,
    "starty": -32,
    "speed": 15
  }
}

class Boot {
  preload() {
   this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   this.scale.pageAlignHorizontally = true;
   this.scale.pageAlignVertically = true;
  }
  create() {
    this.state.start("Load");
  }
}

class Load {
  preload() {
    console.log("Loading...");
    this.load.image("bg",C.bg.file);
    this.load.spritesheet("player",C.p.file,C.p.width,C.p.height,C.p.frames);
    this.load.spritesheet("batarang",C.d.file,C.d.width,C.d.height,C.d.frames);
  }
  create () {
    console.log("Loading Complete.");
    this.state.start("Play");
  }
}
class Play {
  create() {
    console.log("Entered Play State");
    this.bg = this.add.tileSprite(0,0,C.bg.width,C.bg.height,"bg");
    this.bg.autoScroll(C.bg.xspeed,C.bg.yspeed);
    this.player = this.add.sprite(C.p.startx,C.p.starty,"player");
    this.player.anchor.set(0.5,0.5);
    this.player.smoothed = false;
    this.player.scale.set(1);
    this.player.animations.add("anim");
    this.player.animations.play("anim",C.p.fps,true);
    this.batarang = this.add.sprite(C.d.startx,C.d.starty,"batarang");
    this.batarang.anchor.set(0.5,0.5);
    this.batarang.smoothed = false;
    this.batarang.scale.set(1);
    this.batarang.animations.add("anim");
    this.batarang.animations.play("anim",C.d.fps,true);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if(this.cursors.left.isDown) {
      this.player.x -= C.p.speed;
    }
    if (this.cursors.right.isDown) {
      this.player.x += C.p.speed;
    }
    if (this.batarang.y > this.game.height) {
      this.batarang.y = C.d.starty;
      let px = (C.d.width * this.batarang.scale.x) / 2;
      let max = C.game.width - px;
      this.batarang.x = randInt(px,max);
    }
    this.batarang.y+= C.d.speed;
    if (checkOverlap(this.player, this.batarang)) {
      text.text = 'Drag the sprites. Overlapping: true';
      }
   else {
     text.text = 'Drag the sprites. Overlapping: false';
   }
    
  }
  
  render() {
    game.debug.text("x: " + this.batarang.x + ", y: " + this.batarang.y, 4, 16);
  }
}
function restart() {
  game.state.start("Boot");
}
function randInt(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function checkOverlap(player, batarang) {
  var boundsA = player.getBounds();
  var boundsB = batarang.getBounds();
  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
var game = new Phaser.Game(C.game.width,C.game.height);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");

