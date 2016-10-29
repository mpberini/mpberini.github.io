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
  }
  create () {
    console.log("Loading Complete.");
  }
}
class Play {
  create() {
    console.log("Entered Play State");
    this.add.tileSprite(0,0,320,568,"bg");
    this.background.autoScroll(0,700);
  }
}

var game = new Phaser.Game(568,320);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");
