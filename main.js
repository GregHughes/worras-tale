// main.js loads all assets as quick as possible for splash screen

/* global Phaser */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'),
  Main = function() {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  music;

Main.prototype = {

  preload: function() {
    game.load.image('parchment', 'assets/images/parchment.jpg');
    game.load.image('loading', 'assets/images/loading.png');
    game.load.script('polyfill', 'lib/polyfill.js');
    game.load.script('utils', 'lib/utils.js');
    game.load.script('splash', 'states/Splash.js');
  },

  create: function() {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');
