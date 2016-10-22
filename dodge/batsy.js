class Boot {
  preload() {
   this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   this.scale.pageAlignHorizontally = true;
   this.scale.pageAlignVertically = true;
  }
}

var game = new Phaser.Game (568,320);
game.state.add("Boot", Boot);
game.state.start("Boot");
