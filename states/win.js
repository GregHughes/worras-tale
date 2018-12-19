var Win = function(game) {};

Win.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt GloriaHalleluja', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 300, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  create: function () {
    game.add.sprite(0, 0, 'parchment');
    var titleStyle = { font: 'bold 60pt GloriaHalleluja', fill: '#FDFFB5', align: 'center'};
    var text = game.add.text(game.world.centerX, 100, "You Win!", titleStyle);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);
    var yourScore = game.add.text(game.world.centerX, 250, "Score: " + score, titleStyle);
    yourScore.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    yourScore.anchor.set(0.5);
    this.addMenuOption('Play Again', function (e) {
      enemyNextFire, fireRate = 750;
      victoryMusic.stop();
      battleMusic.loop = true;
      if (gameOptions.playMusic == true) { battleMusic.play(); };
      this.game.state.start("Game");
    });
    this.addMenuOption('Main Menu', function (e) {
      victoryMusic.stop();
      music.loop = true;
      if (gameOptions.playMusic == true) { music.play(); };
      this.game.state.start("gamemenu");
    });
  }
};