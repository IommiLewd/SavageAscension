class Ally extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, 'whiteSpace');
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 300;
        this.torso = this.game.add.sprite(-2, -14, 'torsos');
        this.torso.anchor.setTo(0.5);
        this.addChild(this.torso);
        this.legs = this.game.add.sprite(-2, 20, 'legs');
        this.legs.anchor.setTo(0.5);
        this.addChild(this.legs);
        this._initLaser();
        this._addAnimations();
        this.onBarrier = false;
        this.targetX = 1300;
        this.targetY = 300;
        this.distance = 1600;
//        this.followDistance = Math.floor(Math.random() * (220 - 80 + 1) + 80);
        this.speed = Math.floor(Math.random() * (110 - 70 + 1) + 70);
        this.leftEvent = Math.floor(Math.random() * (190 - 70 + 1) + 70);
        this.rightEvent = Math.floor(Math.random() * (800 - 480 + 1) + 480);
        
        this.movingForward = false;
        this._initBullets();
        this._fireMachinegun();

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
    _fireMachinegun() {
        /*this.player._fireWeapon();*/
        this.fireRate = 90;
        this.bullet;
        this.bullets.setAll('frame', 0);
        this.randomNumber = (Math.random() - 0.5) * 2;
        if (this.game.time.now > this._nextFire && this.bullets.countDead() > 4) {
            this._nextFire = this.game.time.now + this.fireRate;
            this.bullet = this.bullets.getFirstDead();
            this.bullet.reset(this.x, this.y - 10);
            this.game.physics.arcade.velocityFromAngle(this._gun.angle + (this.randomNumber * 5), 1600, this.bullet.body.velocity);
            this.bullet.angle = this._gun.angle;
            this.bullets.add(this.bullet);
        }
    }

    _addAnimations() {
        this.torso.animations.add('normal', [0], 10, true);
        this.torso.animations.add('upward', [1], 10, true);
        this.torso.animations.add('downward', [2], 10, true);

        this.legs.animations.add('stand', [0], 10, true);
        this.legs.animations.add('walk', [1, 2, 3], 6, true);
        this.legs.animations.add('backwards', [4, 5, 6], 6, true);
        this.legs.animations.add('fly', [3], 6, true);
    }



    _initLaser() {
        this._gun = this.game.add.sprite(-4, -8, 'gun');
        this._gun.anchor.setTo(0.1, 0.5);
        this.addChild(this._gun);
        this._gun.animations.add('fire', [0, 1, 2], 30, true);
        this._gun.animations.add('notFiring', [0], 30, false);
        this._laser_pointer = this.game.add.tileSprite(0, 0, 768, 0.5, 'pointer');
        this._gun.addChild(this._laser_pointer);
    }


    update() {
        //    this._gun.rotation = this.game.physics.arcade.angleToPointer(this);


        if (this.body.touching.down) {
            this.onBarrier = true;
        }



        var angle = Math.atan2(this.targetY - this.world.y, this.targetX - this.world.x);
        angle = angle * (180 / Math.PI);
        this._gun.angle = angle;
//

        var distance = Phaser.Math.distance(this.targetX, this.targetY, this.world.x, this.world.y);




        if (this.movingForward === false && this.x < this.leftEvent) {
            this.body.velocity.x = this.speed;
            this.movingForward = true;
        }


        if(this.movingForward && this.x > this.rightEvent){
            this.body.velocity.x = 0;
            this.movingForward = false;
        }



 if(this.distance < 600){
      this._fireMachinegun();
     this._gun.animations.play('fire');
 } else {
     this._gun.animations.play('notFiring');
 }



        if (this.targetX < this.world.x) {
            //            if(distance > this.followDistance){
            //            this.body.velocity.x = -this.speed;
            //            } else {
            //                          this.body.velocity.x = 0; 
            //                      }
            this.torso.scale.setTo(-1.0, 1.0);
            this._gun.scale.setTo(1.0, -1.0);
            if (this._gun.angle < -160) {
                this.torso.animations.play('normal');
            } else if (this._gun.angle > -15) {
                this.torso.animations.play('upward');
            } else {
                this.torso.animations.play('downward');
            }
        } else {
            //             if(distance > this.followDistance){
            //            this.body.velocity.x = this.speed;
            //                      } else {
            //                          this.body.velocity.x = 0; 
            //                      }
            this.legs.scale.setTo(1.0, 1.0);
            this.torso.scale.setTo(1.0, 1.0);
            this._gun.scale.setTo(1.0, 1.0);
            if (this._gun.angle > -20 && this._gun.angle < 20) {
                this.torso.animations.play('normal');
            } else if (this._gun.angle > -20) {
                this.torso.animations.play('upward');
            } else {
                this.torso.animations.play('downward');
            }
        }




        //        if (this._up.isDown && this.body.blocked.down || this._up.isDown && this.onBarrier) {
        //            this.body.velocity.y = -220;
        //            this.onBarrier = false;
        //        }

        if (this.body.blocked.down || this.onBarrier) {
            if (this.body.velocity.x > 0) {
                this.legs.animations.play('walk');
            } else if (this.body.velocity.x < 0) {
                this.legs.animations.play('backwards');
            } else {
                this.legs.animations.play('stand');
            }
        } else {
            this.legs.animations.play('fly');
            this.onBarrier = false;
        }


    }
}