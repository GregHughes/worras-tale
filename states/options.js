var Options = function(game) {};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: 260,
    startX: "center"
  },

  init: function() {
    this.titleText = game.make.text(game.world.centerX, 100, "Worra's Tale", {
      font: 'bold 60pt GloriaHalleluja',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function() {
    game.add.sprite(0, 0, 'parchment');
    game.add.existing(this.titleText);
    this.addMenuOption(gameOptions.playMusic ? 'Mute Music' : 'Play Music', function(target) {
      gameOptions.playMusic = !gameOptions.playMusic;
      target.text = gameOptions.playMusic ? 'Mute Music' : 'Play Music';
      music.volume = gameOptions.playMusic ? 1 : 0;
    });
    this.addMenuOption(gameOptions.playSound ? 'Mute Sound' : 'Play Sound', function(target) {
      gameOptions.playSound = !gameOptions.playSound;
      target.text = gameOptions.playSound ? 'Mute Sound' : 'Play Sound';
    });
    this.addMenuOption('<- Back', function() {
      game.state.start("gamemenu");
    });
  }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
