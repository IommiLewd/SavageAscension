class SimpleLevel extends Phaser.State {
    constructor() {
        super();
    }

    _loadLevel() {
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.game.world.setBounds(0, 0, 1536, 900);
        this.game.stage.backgroundColor = "#1b2823";
        this.gradient = this.game.add.tileSprite(0, 0, 1600, 900, 'gradient');
        //this.background1 = this.game.add.tileSprite(this.game.world.width/2, 0, 300, 900, 'background1');
        // this.background1.anchor.setTo(0.5, 0.0);
        // this.background2 = this.game.add.image(0, 0, 'background2');
        this._loadCameraTarget();
        this.UpperBound = this.game.add.tileSprite(0, 0, this.game.world.width, 32, 'outOfBounds');
        this.lowerBound = this.game.add.tileSprite(0, 868, this.game.world.width, 32, 'outOfBounds');
    }


    _addPlayer() {
        this.player = new Player(this.game, 200, 100, 'player');
    }


    _addEnemyGroup(side) {
        this.enemy = new Enemy(this.game, 100, 100, 'enemy');
    }

    _initBullets() {
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('anchor.x', 0.0);
        this.bullets.setAll('anchor.y', 0.5);

        //  --- Disable Gravity for Each Bullet
        this.bullets.forEach(function (L) {
            L.body.allowGravity = false;
        });
        this._nextFire = 200;


    }
    _mouseWheel() {
        console.log('mousewheel fired, selectedGun is: ' + this.selectedGun);
    }

    _fireMachinegun() {
        /*this.player._fireWeapon();*/
        this.fireRate = 90;
        this.bullet;
        this.bullets.setAll('frame', 0);
        this.randomNumber = (Math.random() - 0.5) * 2;
        if (this.game.time.now > this._nextFire && this.bullets.countDead() > 4) {
            this._nextFire = this.game.time.now + this.fireRate;
            this.bullet = this.bullets.getFirstDead();
            this.bullet.reset(this.player.x, this.player.y - 10);
            this.game.physics.arcade.velocityFromAngle(this.player._gun.angle + (this.randomNumber * 5), 1600, this.bullet.body.velocity);
            this.bullet.angle = this.player._gun.angle;
            this.bullets.add(this.bullet);
        }
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

    _fireChargedPulsar() {
        this.fireRate = 340;
        this.bullet;
        this.bullets.setAll('frame', 2);
        if (this.game.time.now > this._nextFire && this.bullets.countDead() > 5) {
            this._nextFire = this.game.time.now + this.fireRate;
            this.bullet = this.bullets.getFirstDead();
            this.bullet.reset(this.player.x, this.player.y);
            this.game.physics.arcade.velocityFromAngle(this.player._laser_pointer.angle, 1600, this.bullet.body.velocity);
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

        this.physics.arcade.overlap(this.bullets, this.barrier.barrierGroup, this._kill_bullet, function (bullet, barrierGroup) {
            return barrierGroup.collides;
        }, this);
        this.game.physics.arcade.collide(this.barrier.barrierGroup, this.player, this.processHandler, this.playerOnBarrier);
        this.game.physics.arcade.collide(this.barrier.barrierGroup, this.enemy, this.processHandler /*, this.playerOnBarrier*/ );
        this.game.physics.arcade.overlap(this.player, this.barrier.barrierGroup, this.onCollision, this.playerOnBarrier);
    }

    playerOnBarrier(player, barrier) {
        
       
    if(player.y < barrier.y + 5){
           player.onBarrier = true;
    } else {player.onBarrier = false;}
    }

    processhandler(player, barrier) {
        return true;
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
        this.enemies = this.game.add.group();
        this._loadLevel();
        this._barrierGenerator();
        //  this._addController();
        this._addPlayer();
        this._initBullets();
        this._addExplosion();
        //        this._initUserInterface();
        //        this._addEnemyGroup();

        // this._addEnemy();

    }

    update() {

        //        //        if(this.enemy.y < 10){
        //        //            this.enemy.kill();
        //        //        }
        if (this.game.input.activePointer.leftButton.isDown) {
            this._fireMachinegun();
            this.player._gun.animations.play('fire');
            // this._fireBeamWeapon();
            //this._fireChargedPulsar();
        } else { this.player._gun.animations.play('notFiring'); }
        //        //        this.enemies.forEachAlive(function (enemy) {
        //        //            enemy.playerX = this.player.x;
        //        //            enemy.playerY = this.player.y;
        //        //        }, this)
        //
        //        //  this.background1.x = this.player.x * 0.1;
        //        //        this.background1.y = this.player.y * 0.12;
        //        //        this.background2.x = this.player.x * 0.11;
        //        //        this.background2.y = this.player.y * 0.11;
        //
        //        if (this.game.input.worldX < this.player.world.x) {
        //          
        //            console.log('facing left');
        //            this.player.facingLeft = true;
        //            this.player.craft.scale.setTo(-1.0, -1.0);
        //              this.player.craft.rotation =+ this.player._laser_pointer.rotation;
        ////            if (this.player._laser_pointer.rotation > this.player.craft.rotation) {
        ////                this.player.craft.rotation -= 0.01;
        ////            } else if (this.player._laser_pointer.rotation > this.player.craft.rotation) {
        ////                this.player.craft.rotation += 0.01;
        ////            }
        //
        //
        //            //this.player._laser_pointer.scale.setTo(1.0, 1.0);
        //
        //        } else {
        //
        //
        //this.player.craft.rotation =+ this.player._laser_pointer.rotation;
        ////            if (this.player._laser_pointer.rotation < this.player.craft.rotation) {
        ////                this.player.craft.rotation -= 0.1;
        ////            } else if (this.player._laser_pointer.rotation > this.player.craft.rotation) {
        ////                this.player.craft.rotation += 0.1;
        ////            }
        //
        //            this.player.facingLeft = false;
        //            //this.player.scale.setTo(-1.0, 1.0);
        //            this.player.craft.scale.setTo(-1.0, 1.0);
        //
        //        }
        //
        //
        var midX = (this.player.x + 0 + this.game.input.worldX) / 2.2;
        var midY = (this.player.y + 0 + this.game.input.worldY) / 2.2;
        this.cameraTarget.x = midX;
        this.cameraTarget.y = midY;
        //
        this._checkCollision();
        //
        ////                if (this._left.isDown) {
        ////                    this.player.body.velocity.x = -280;
        ////                } else if (this._right.isDown) {
        ////                    this.player.body.velocity.x = 280;
        ////                } else {
        ////                    this.player.body.velocity.x = 0;
        ////                }
        ////                if (this._up.isDown) {
        ////                    this.player.body.velocity.y = -120;
        ////                }
        ////                if (this._down.isDown) {
        ////                    this.player.body.velocity.y = 120;
        ////                }
        //
        //
        //        if (this._left.isDown) {
        //            if(this.player.body.acceleration < 100){
        //            this.player.body.acceleration.x = -280;
        //        }} else if (this._right.isDown) {
        //            this.player.body.acceleration.x = 280;
        //        } else {
        //            this.player.body.acceleration.x = 0;
        //        }
        //        if (this._up.isDown) {
        //            this.player.body.acceleration.y = -220;
        //        }
        //        if (this._down.isDown) {
        //            this.player.body.acceleration.y = 220;
        //        }
        //
        //
        //
        //
        //
        //
        //
        //
        //        //
        //        //        if (this._up.isDown && this.player.onBarrier) {
        //        //            this.player.body.velocity.y = -500;
        //        //            this.player.onBarrier = false;
        //        //            this.player.doubleJump = true;
        //        //            this.jumpTimer = this.game.time.now + 500;
        //        //        }
        //        //
        //        //        if (this._up.isDown && this.player.doubleJump && this.game.time.now > this.jumpTimer) {
        //        ////            this.player.body.velocity.y = -500;
        //        ////            this.player.doubleJump = false;
        //        //        }

    }

    render() {
        //          this.game.debug.body(this.player);
    }
}