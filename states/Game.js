/* global Phaser */
/* global game */
var Game = function(game) {},
  // score value
  score,
  // health
  health,
  // object showing health scroe
  textHealth,
  // object showing score value
  textScore,
  // sprites
  archer, arrow, axe,
  // enemy values
  enemies, enemyspeed, enemiesTotal, enemiesAlive, enemyNextFire, enemiesKilled,
  // stores rate of fire for shooting
  fireRate = 750,
  nextFire = 0;

Game.prototype = {

  preload: function() {
    // define asset keys for game assets in preload
    game.load.image("bg", "assets/images/ground.png");
    game.load.image("archer", "assets/images/archer.png");
    game.load.image("orc", "assets/images/orc.png");
    game.load.image("arrow", "assets/images/arrow.png");
    game.load.image("axe", "assets/images/axe.png");
  }, // end preload

  create: function() {
    // set initial score
    score = 0;
    // set player health
    health = 100;
    // enable phaser arcade physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // add tiled texture for background using tileSprite()
    game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg");

    // ARCHER *****************************************
    // archer sprite group
    archer = game.add.sprite(game.width / 4, game.height / 3, "archer");
    archer.anchor.set(0.5);
    // enables physics engine behavior for archer group
    game.physics.enable(archer, Phaser.Physics.ARCADE);
    archer.body.collideWorldBounds = true;

    // ORCS *****************************************
    /* global Orc*/
    Orc = function(index, game) {

      var x = game.width;
      var y = Math.random() * game.height;

      this.game = game;
      this.alive = true;
      this.player = archer;
      this.axe = axe;

      this.nextFire = enemyNextFire;
      this.fireRate = fireRate + 650;

      this.orc = game.add.sprite(x, y, 'orc');
      this.orc.anchor.setTo(0.5, 0.5);
      this.orc.name = index.toString();
      this.orc.health = 2;

      game.physics.enable(this.orc, Phaser.Physics.ARCADE);
      this.orc.body.enableBody = true;
      this.orc.body.physicsBodyType = Phaser.Physics.ARCADE;
    };

    Orc.prototype.update = function() {
      if (this.orc.alive && this.game.physics.arcade.distanceBetween(this.orc, this.player) < 550) {

        if (this.game.time.now > this.nextFire * (Math.random() * 750) && this.axe.countDead() > 0) {
          this.nextFire = this.game.time.now + this.fireRate;

          var enemybullet = axe.getFirstDead();

          enemybullet.reset(this.orc.x, this.orc.y);

          this.game.physics.arcade.moveToObject(enemybullet, this.player, 200);
        }
      }
    };

    // ARROWS *****************************************
    // arrows sprite group
    arrow = game.add.group();
    // enables physics engine behavior for arrows group
    arrow.enableBody = true;
    arrow.physicsBodyType = Phaser.Physics.ARCADE;
    arrow.createMultiple(50, 'arrow');
    arrow.setAll('checkWorldBounds', true);
    arrow.setAll('outOfBoundsKill', true);
    // arrow.rotation = this.archer.rotation;
    // this.game.physics.arcade.velocityFromRotation(this.archer.rotation, fireRate, arrow.body.velocity);

    // AXES *****************************************
    // axe sprite group
    axe = game.add.group();
    // enables physics engine behavior for axes group
    axe.enableBody = true;
    axe.physicsBodyType = Phaser.Physics.ARCADE;
    axe.createMultiple(50, 'axe');
    axe.setAll('checkWorldBounds', true);
    axe.setAll('outOfBoundsKill', true);

    // display score text value
    textScore = game.add.text(
      25,
      45,
      "Score: " + score.toString(), {
        font: "30px Georgia",
        fill: "#fff"
      }
    );

    // display health text value
    textHealth = game.add.text(
      25,
      10,
      "Health: " + health.toString(), {
        font: "30px Georgia",
        fill: "#fff"
      }
    );

    // generate enemies array
    enemies = [];
    // tracks total of killed enemies
    enemiesKilled = 0;
    // set total starting enemies
    enemiesTotal = 3;
    // count alive enemies
    enemiesAlive = 0;
    // enemies speed
    enemyspeed = 14;
    // enemy fire rate
    enemyNextFire = 750;
  }, // end create

  update: function() {
    // add WASD keyboard functionality
    var wasd = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    if (wasd.left.isDown) {
      archer.x = archer.x - 2.5;
    }

    if (wasd.right.isDown) {
      archer.x = archer.x + 2.5;
    }

    if (wasd.down.isDown) {
      archer.y = archer.y + 2.5;
    }

    if (wasd.up.isDown) {
      archer.y = archer.y - 2.5;
    }

    // mouse down click event
    game.input.onDown.add(this.shoot, this);

    for (var i = 0; i < enemies.length; i++) {
      // check to see if enemies are hit by arrow
      if (enemies[i].alive) {
        game.physics.arcade.overlap(arrow, enemies[i].orc, this.hitOrc);
        game.physics.arcade.moveToObject(enemies[i].orc, archer, 60, (enemyspeed * 1000));
        enemies[i].update();
      }
    }

    // spawn new enemy if available
    for (enemiesAlive; enemiesAlive < enemiesTotal; enemiesAlive++) {
      enemies.push(new Orc(enemiesAlive, game));
    }

    game.physics.arcade.overlap(axe, archer, this.hitArcher);
    game.physics.arcade.overlap(arrow, axe, this.blockThrow);
  }, // end update

  shoot: function() {
    if (game.time.now > nextFire && arrow.countDead() > 0) {
      nextFire = game.time.now + fireRate;

      var bullet = arrow.getFirstDead();

      if (gameOptions.playSound == true) { archerShoot.play(); };

      bullet.reset(archer.x, archer.y);
      bullet.rotation = game.physics.arcade.angleToPointer(bullet);

      game.physics.arcade.moveToPointer(bullet, 500);
    }
  },

  blockThrow: function(theArrow, theAxe) {
    if (gameOptions.playSound == true) { collide.play(); };
    theArrow.kill();
    theAxe.kill();
    score = score + 5;
    textScore.setText('Score: ' + score.toString());
  },

  hitOrc: function(obj1, obj2) {
    score = score + 10;
    textScore.setText('Score: ' + score.toString());
    obj1.kill();
    obj2.kill();
    if (gameOptions.playSound == true) { orcDie.play(); };
    enemiesKilled++;
    enemiesAlive--;

    // gets harder as you progress
    if (enemiesKilled === 10) {
      enemiesTotal++;
      enemyspeed--;
      fireRate = fireRate - 75;
      enemyNextFire = enemyNextFire + 25;
    }
    if (enemiesKilled === 20) {
      enemiesTotal++;
      enemyspeed--;
      fireRate = fireRate - 75;
      enemyNextFire = enemyNextFire + 25;
    }
    if (enemiesKilled === 30) {
      enemiesTotal++;
      enemyspeed--;
      fireRate = fireRate - 75;
      enemyNextFire = enemyNextFire + 25;
    }
    if (enemiesKilled === 50) {
      enemiesTotal++;
      enemyspeed--;
      fireRate = fireRate - 75;
      enemyNextFire = enemyNextFire + 25;
    }
    if (enemiesKilled === 75) {
      enemiesTotal++;
      enemyspeed--;
      fireRate = fireRate - 75;
      enemyNextFire = enemyNextFire + 25;
    }
    if (enemiesKilled === 90) {
      enemiesTotal++;
      enemyspeed--;
      fireRate = fireRate - 75;
      enemyNextFire = enemyNextFire + 25;
    }
    if (enemiesKilled === 100) {
      game.lockRender = true;
      battleMusic.stop();
      victoryMusic = game.add.audio('victory-bgm');
      if (gameOptions.playMusic == true) { victoryMusic.play(); };
      setTimeout(function() {
        game.lockRender = false;
        game.state.start("win");
      }, 1000);
    }
  },

  hitArcher: function(hero, theAxe) {
    game.add.tween(archer).to({ alpha: 1 }, 0, Phaser.Easing.Linear.None, true, 0, 2, true);
    health = health - 15;
    textHealth.setText('Health: ' + health.toString());
    theAxe.kill();
    game.add.tween(archer).to({ alpha: 0 }, 150, Phaser.Easing.Linear.None, true, 0, 2, true);

    if (health <= 0) {
      game.lockRender = true;
      battleMusic.stop();
      loseMusic = game.add.audio('lose-bgm');
      if (gameOptions.playMusic == true) { loseMusic.play(); };
      setTimeout(function() {
        game.lockRender = false;
        game.state.start("gameover");
      }, 1000);
    }
  }
};
