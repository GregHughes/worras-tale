var Credits = function(game) {};

Credits.prototype = {

  preload: function() {
    this.optionCount = 1;
    this.creditCount = 0;

  },

  addCredit: function(task, author, extra) {
    var authorStyle = { font: '20pt GloriaHalleluja', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4 };
    var taskStyle = { font: '15pt GloriaHalleluja', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4 };
    var authorText = game.add.text(game.world.centerX, 900, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, 950, task, taskStyle);
    var extraText = game.add.text(game.world.centerX, 1000, extra, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    extraText.anchor.setTo(0.5);
    extraText.stroke = "rgba(0,0,0,0)";
    extraText.strokeThickness = 4;
    game.add.tween(authorText).to({ y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    game.add.tween(taskText).to({ y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    game.add.tween(extraText).to({ y: -100 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.creditCount++;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt GloriaHalleluja', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4 };
    var txt = game.add.text(10, (this.optionCount * 80) + 450, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function(target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function(target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount++;
  },

  create: function() {
    this.stage.disableVisibilityChange = true;
    if (gameOptions.playMusic) {
      music.stop();
      music = game.add.audio('menu-bgm');
      music.play();
    }
    var bg = game.add.sprite(0, 0, 'parchment', '');
    this.addCredit('Developer', 'Greg Hughes', 'www.gregscode.com');
    this.addCredit('The Looming Battle by Zefz', 'Music', 'https://opengameart.org/users/zefz');
    this.addCredit('', 'BattleThemeA by cynicmusic', 'https://opengameart.org/users/cynicmusic');
    this.addCredit('', 'No Hope by CleytonKauffman', 'https://opengameart.org/users/cleytonkauffman');
    this.addCredit('', 'Just a random fanfare by Spring', 'https://opengameart.org/users/spring');
    this.addCredit('Sounds', 'Little Robot Sound Factory', 'www.littlerobotsoundfactory');
    this.addCredit('', 'TinyWorlds', 'https://opengameart.org/users/tinyworlds');
    this.addCredit('', 'dorkster', 'https://opengameart.org/users/dorkster');
    this.addCredit('', 'artisticdude', 'https://opengameart.org/users/artisticdude');
    this.addCredit('LordNeo', 'Images', 'https://opengameart.org/users/lordneo');
    this.addCredit('', 'VWolfdog', 'https://opengameart.org/users/vwolfdog');
    this.addCredit('', 'IsometricRobot', 'https://opengameart.org/users/isometricrobot');
    this.addCredit('', 'Nekith', 'https://opengameart.org/users/nekith');
    this.addCredit('by OpenGameArt.org', 'All Game Assets Provided', '');
    this.addCredit('Matt McFarland', 'Special Thanks', 'https://github.com/MattMcFarland');
    this.addCredit('Phaser.io', 'Powered By', '');
    this.addCredit('for playing!', 'Thank you', '');
    this.addMenuOption('<- Back', function(e) {
      music.stop();
      game.state.start("gamemenu");
    });
    game.add.tween(bg).to({ alpha: 0 }, 20000, Phaser.Easing.Cubic.Out, true, 120000);
  }

};
