var C = {
  "game": {
    "width":320,
    "height": 568
  },
  "bg": {
    "width": 320,
    "height": 1704,
    "xspeed": 0,
    "yspeed": 500,
    "file": "background.png"
  },
  "p": {
    "file": "player.png",
    "width": 46,
    "height": 64,
    "frames":2
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
  }
}

function restart() {
  game.state.start("boot");
}
var game = new Phaser.Game(C.game.width,C.game.height);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");
