class SimpleLevel extends Phaser.State {
    constructor() {
        super();
    }

    _loadLevel() {
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.game.world.setBounds(0, 0, 1536, 600);
        this.game.stage.backgroundColor = "#1b2823";
        this.gradient = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'gradient');
        this.background = this.game.add.tileSprite(0, this.game.world.height - 212, this.game.world.width, 212, 'background');
        this._loadCameraTarget();
    }


    _addPlayer() {
        this.player = new Player(this.game, 700, 100, 'player');
        this.allies.add(this.player);
    }


    _addAlly(amount) {
        if (amount === undefined) {
            amount = 2;

        }
        for (var i = 0; i < amount; i++) {
            this.ally = new Ally(this.game, 100, 100, 'enemy');
            this.allies.add(this.ally);
        }
    }


    _addEnemy(amount) {
        if (amount === undefined) {
            amount = 2;

        }
        for (var i = 0; i < amount; i++) {
            this.enemy = new Enemy(this.game, 1800, 100, 'enemy');
            this.enemies.add(this.enemy);
            this.enemiesSpawned++;
        }
    }


    _mouseWheel() {
        console.log('mousewheel fired, selectedGun is: ' + this.selectedGun);
    }



    _fireBeamWeapon() {
        this.fireRate = 0;
        this.bullet;
        this.bullets.setAll('frame', 1);
        if (this.game.time.now > this._nextFire && this.bullets.countDead() > 5) {
            this._nextFire = this.game.time.now + this.fireRate;
            this.bullet = this.bullets.getFirstDead();
            this.bullet.reset(this.player.x, this.player.y);
            this.game.physics.arcade.velocityFromAngle(this.player._gun.angle, 1600, this.bullet.body.velocity);
            this.bullet.angle = this.player._laser_pointer.angle;
            this.bullets.add(this.bullet);
        }
    }


    _initUserInterface() {
        this.userInterface = new UserInterface(this);
    }


    _loadCameraTarget() {
        this.cameraTarget = this.game.add.image(200, 200, 'crossHair');
        this.cameraTarget.anchor.setTo(0.5);
        this.game.camera.follow(this.cameraTarget);
    }

    _barrierGenerator() {
        this.barrier = new barrierGenerator(this.game, 5);
    }



    _kill_bullet(bullet, barrier) {
        bullet.kill();
        this.explosion.x = bullet.x;
        this.explosion.y = bullet.y;
        this.explosion.on = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this._endExplosion, this);
    }


    _endExplosion() {
        this.explosion.on = false;
    }

    _checkCollision() {
        //       this.game.physics.arcade.overlap(this.ally.bullets, this.enemies, this.impactHandler, null, this);
        //        this.physics.arcade.overlap(this.bullets, this.barrier.barrierGroup, this._kill_bullet, function (bullet, barrierGroup) {
        //            return barrierGroup.collides;
        //        }, this);
        this.game.physics.arcade.collide(this.barrier.tileGroup, this.allies, this.processHandler, this.playerOnBarrier);
        this.game.physics.arcade.collide(this.barrier.tileGroup, this.enemies, this.processHandler, this.playerOnBarrier);


        this.game.physics.arcade.overlap(this.allies, this.enemies, this.allyHit);
    }


    allyHit(ally, enemy) {
        ally.x = -2000;
        ally.kill();
        enemy._attacking();
        console.log('woof woof');
    }
    playerOnBarrier(ally, barrier) {

        ally.onBarrier = true;
    }

    processhandler(player, barrier) {
        return true;
    }


    impactHandler(bullet, enemy) {
        bullet.kill();
        enemy._damageTaken();
        if (enemy.health < 0) {
            this.enemiesSpawned--;
            console.log('dead! enemies currently alive: ' + this.enemiesSpawned);
            if (this.enemiesSpawned <= 0) {
                this._waveGenerator();
            }
        }

    }
    _waveGenerator() {


        //waveGenerator is gonna look like dis
        /*
        this.currentWave++;
        this.amountOfSpawns = 2;
        this.levelOfSpawns = 1;
        this._addEnemy(this.amountOfSpawns, this.levelOfSpawns);
        
    
        */
        console.log('waveGenerator fired');
        this._addEnemy(5);

    }
    _addExplosion() {
        this.explosion = this.game.add.emitter(0, 0, 100);
        this.explosion.width = 0;
        this.explosion.makeParticles('blueFlame');
        this.explosion.minParticleSpeed.setTo(-200, -200);
        this.explosion.maxParticleSpeed.setTo(200, 200);
        this.explosion.setRotation(0, 190);
        this.explosion.setAlpha(0.1, 1);
        this.explosion.forEach(function (particle) {
            particle.body.allowGravity = false;
            particle.animations.add('emit1', [0]);
            particle.animations.add('emit2', [1]);
            particle.animations.add('emit3', [2]);
            var randSpeed = Math.random() * (4 - 0) + 0;
            var randSpeed = Math.floor(randSpeed);
            if (randSpeed === 1) {
                particle.animations.play('emit1', 30, true);
            } else if (randSpeed === 2) {
                particle.animations.play('emit2', 30, true);
            } else {
                particle.animations.play('emit3', 30, true);
            }
        }, this);
        this.explosion.setScale(0.3, 1.3, 0.3, 1.3, 160);
        this.explosion.start(false, 160, 2);
        this.explosion.on = false;
    }








    preload() {}

    create() {
        this.jumpTimer = 0;
        this.selectedGun = 0;
        this.enemiesSpawned = 0;
        this._loadLevel();
        this.enemies = this.game.add.group();
        this.allies = this.game.add.group();
        this._barrierGenerator();
        //  this._addController();
        this._addPlayer();

        //        this._addExplosion();

        //        this._initUserInterface();

        this._addAlly(8);
        this._addEnemy(4);


    }

    update() {
        if (this.game.input.activePointer.leftButton.isDown) {
            this.player._fireMachinegun();
            this.player._gun.animations.play('fire');


        } else {
            this.player._gun.animations.play('notFiring');
        }
this.background.tilePosition.x -= 0.2;
        //        this.allies.forEachAlive(function (ally) {
        //            var targetX;
        //            var targetY;
        //            var currentX;
        //            this.lowestX = 1600;
        //            
        //            this.enemies.forEachAlive(function (enemy){
        //               //currentX = this.x;
        //                   currentX = enemy.x;
        //                //console.log('current x is: ' + currentX + 'lowestX ' + this.lowestX);
        //                
        //                if(currentX < this.lowestX){
        //                    this.lowestX = currentX;
        //                    targetX = enemy.x;
        //                    targetY = enemy.y;
        //                }
        //                           }, this)                 
        //                                      
        //                       ally.targetX = targetX;               
        //                       ally.targetY = targetY;   
        //            console.log(ally.targetY);
        //                                      
        //                                      
        //
        //        }, this)



        this.allies.forEachAlive(function (ally) {
            this.game.physics.arcade.overlap(ally.bullets, this.enemies, this.impactHandler, null, this);
            var targetX;
            var targetY;

            var lowest_distance = 1600;
            this.enemies.forEachAlive(function (enemy) {

                var distance = Phaser.Math.distance(ally.x, ally.y, enemy.x, enemy.y);
                if (distance < lowest_distance) {
                    lowest_distance = distance;
                    targetX = enemy.x;
                    targetY = enemy.y;
                }
            }, this)
            if (lowest_distance < 800) {
                ally.distance = lowest_distance;
                ally.targetX = targetX;
                ally.targetY = targetY;
            } else {
                ally.distance = 1600;
                ally.targetX = 1600;
                ally.targetY = 720;
            }

        }, this)




        // this.background.x = this.player.x * 0.1;
        //        //        this.background1.y = this.player.y * 0.12;
        //        //        this.background2.x = this.player.x * 0.11;
        //        //        this.background2.y = this.player.y * 0.11;

        var midX = (this.player.x + 0 + this.game.input.worldX) / 2.2;
        var midY = (this.player.y + 0 + this.game.input.worldY) / 2.2;
        this.cameraTarget.x = midX;
        this.cameraTarget.y = midY;

        this._checkCollision();


    }

    render() {
        //          this.game.debug.body(this.player);
    }
}