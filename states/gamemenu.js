// gamemenu.js loads game menu after splash.js preloads assets

var GameMenu = function() {};

GameMenu.prototype = {

  menuConfig: {
    startY: 260,
    startX: 30
  },

  init: function() {
    this.titleText = game.make.text(game.world.centerX, 100, "Worra's Tale", {
      font: 'bold 60pt GloriaHalleluja',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);

    this.instructionsText = game.make.text(game.world.centerX - 100, 375, "Move Worra with the \"W\", \"A\", \"S\", \"D\" keys. Point and click your mouse to fire at orcs.", {
      font: '25pt GloriaHalleluja',
      fill: '#FFFFFF',
      align: 'center',
      wordWrap: true,
      wordWrapWidth: 450
    });
    this.instructionsText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    this.aboutText = game.make.text(game.world.centerX, 225, "The mighty hero Worra must defend her village from a viscious band of orcs using nothing but her trusted bow. Help her defend her village and become a legend!", {
      font: 'bold 18pt GloriaHalleluja',
      fill: '#FBFF68',
      align: 'center',
      wordWrap: true,
      wordWrapWidth: 700
    });
    this.aboutText.anchor.set(0.5);
    this.aboutText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    this.optionCount = 1;
  },

  create: function() {
    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'parchment');
    game.add.existing(this.titleText);
    game.add.existing(this.instructionsText);
    game.add.existing(this.aboutText);

    this.addMenuOption('Start', function() {
      game.state.start("Game");
      music.stop();
      battleMusic = game.add.audio('battle-bgm');
      battleMusic.loop = true;
      if (gameOptions.playMusic == true) { battleMusic.play(); };
    });
    this.addMenuOption('Options', function() {
      game.state.start("options");
    });
    this.addMenuOption('Credits', function() {
      game.state.start("credits");
    });
  }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
