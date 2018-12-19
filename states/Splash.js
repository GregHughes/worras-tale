// splash.js loads the rest of the game's assets and displays a progress bar as they are loaded

var Splash = function() {};

Splash.prototype = {

  loadScripts: function() {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu', 'states/gamemenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover', 'states/gameover.js');
    game.load.script('credits', 'states/credits.js');
    game.load.script('options', 'states/options.js');
    game.load.script('win', 'states/win.js');
  },

  loadAudio: function() {
    game.load.audio('menu-bgm', 'assets/sounds/TheLoomingBattle.OGG');
    game.load.audio('orc-die', 'assets/sounds/orc_dies.mp3');
    game.load.audio('battle-bgm', 'assets/sounds/battleThemeA.mp3');
    game.load.audio('victory-bgm', 'assets/sounds/fanfare.ogg');
    game.load.audio('lose-bgm', 'assets/sounds/NoHope.mp3');
    game.load.audio('archer-shoot', 'assets/sounds/shoot.ogg');
    game.load.audio('collide', 'assets/sounds/collide.wav');
  },

  loadImages: function() {
    // game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    // game.load.image('options-bg', 'assets/images/options-bg.jpg');
    // game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
  },

  loadFonts: function() {
    WebFontConfig = {
      custom: {
        families: ['GloriaHalleluja'],
        urls: ['assets/style/gloriahallelujah.css']
      }
    };
  },

  init: function() {
    this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 550, "loading");
    this.logo = game.make.text(game.world.centerX, 300, 'Loading Worra\'s Tale \n By Greg Hughes', { fill: 'white', align: 'center' });
    this.logo.anchor.setTo(0.5, 0.5);
    this.status = game.make.text(game.world.centerX, 525, 'Loading...', { fill: 'white' });
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function() {
    game.add.sprite(0, 0, 'parchment');
    game.add.existing(this.logo);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadAudio();

  },

  addGameStates: function() {
    game.state.add("gamemenu", GameMenu);
    game.state.add("Game", Game);
    game.state.add("gameover", GameOver);
    game.state.add("credits", Credits);
    game.state.add("options", Options);
    game.state.add("win", Win);
  },

  addGameMusic: function() {
    loseMusic = game.add.audio('lose-bgm');
    battleMusic = game.add.audio('battle-bgm');
    victoryMusic = game.add.audio('victory-bgm');
    music = game.add.audio('menu-bgm');
    music.loop = true;
    music.play();
  },

  addGameSounds: function() {
    collide = game.add.audio('collide');
    archerShoot = game.add.audio('archer-shoot');
    orcThrow = game.add.audio('orc-throw');
    orcDie = game.add.audio('orc-die');
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();
    this.addGameSounds();

    setTimeout(function() {
      game.state.start("gamemenu");
    }, 2000);
  }
};
