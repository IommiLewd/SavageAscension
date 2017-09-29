class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, 'charger');
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);
        //this.body.collideWorldBounds = true;
        this.body.gravity.y = 300;
        
        
                this.size = Math.floor(Math.random() * (12 - 6 + 1) + 6);
        this.size = this.size / 10;
        console.log('current size is: ' + this.size);
        this.scale.setTo(this.size, this.size);
        this.targetX = 300;
        this.targetY = 300;
        this._addAnimations();
        this.speed = Math.floor(Math.random() * (40 - 10 + 1) + 10);
        
        this.health = 260;
        this.attackingNow = false;
    }



    _addAnimations() {
        this.animations.add('forward', [1, 2, 3, 4], 6, true);
        this.animations.add('attacking', [5, 6, 7, 8], 6, true);
        //        this.torso.animations.add('normal', [0], 10, true);
        //        this.torso.animations.add('upward', [1], 10, true);
        //        this.torso.animations.add('downward', [2], 10, true);
        //
        //        this.legs.animations.add('stand', [0], 10, true);
        //        this.legs.animations.add('walk', [1, 2, 3], 6, true);
        //        this.legs.animations.add('backwards', [4, 5, 6], 6, true);
        //        this.legs.animations.add('fly', [3], 6, true);
        this.animations.play('forward');
    }

    _attacking() {
        if (this.attackingNow === false) {
            this.attackingNow = true;

            var animReference;

            animReference = this.animations.play('attacking');
            animReference = this.animations.currentAnim.onComplete.add(function () {
                console.log('animation complete');
            }, this);

        }
    }

    _damageTaken() {
        this.health -= 3;
        this.tint = Math.random() * 0xffffff;
    }
    update() {
        this.body.velocity.x = -this.speed;


        if (this.health < 0) {
            this.x = 1650;
            this.kill();
        }

        if (this.x < 200) {
            this.x = 1650;
            this.kill();
        }
        this.body.velocity.x = -this.speed;
        //    this._gun.rotation = this.game.physics.arcade.angleToPointer(this);
        //   
        //var angle = Math.atan2(this.targetY - this.world.y, this.targetX - this.world.x );
        //angle = angle * (180/Math.PI);
        //this._gun.angle = angle;
        ////
        ////
        ////        
        //        var distance = Phaser.Math.distance(this.playerX , this.playerY , this.world.x  , this.world.y);

        //             if (this.targetX < this.world.x) {
        //            //            if(distance > this.followDistance){
        //            //            this.body.velocity.x = -this.speed;
        //            //            } else {
        //            //                          this.body.velocity.x = 0; 
        //            //                      }
        //            this.torso.scale.setTo(-1.0, 1.0);
        //            this._gun.scale.setTo(1.0, -1.0);
        //            if (this._gun.angle < -160) {
        //                this.torso.animations.play('normal');
        //            } else if (this._gun.angle > -15) {
        //                this.torso.animations.play('upward');
        //            } else {
        //                this.torso.animations.play('downward');
        //            }
        //        } else {
        //            //             if(distance > this.followDistance){
        //            //            this.body.velocity.x = this.speed;
        //            //                      } else {
        //            //                          this.body.velocity.x = 0; 
        //            //                      }
        //            this.legs.scale.setTo(1.0, 1.0);
        //            this.torso.scale.setTo(1.0, 1.0);
        //            this._gun.scale.setTo(1.0, 1.0);
        //            if (this._gun.angle > -20 && this._gun.angle < 20) {
        //                this.torso.animations.play('normal');
        //            } else if (this._gun.angle > -20) {
        //                this.torso.animations.play('upward');
        //            } else {
        //                this.torso.animations.play('downward');
        //            }
        //        }
        ////        if (this.playerX < this.world.x) {
        ////            if(distance > this.followDistance){
        ////            this.body.velocity.x = -this.speed;
        ////            } else {
        ////                          this.body.velocity.x = 0; 
        ////                      }
        ////            this.torso.scale.setTo(-1.0, 1.0);
        ////            this._gun.scale.setTo(1.0, -1.0);
        ////            if (this._gun.angle < -160) {
        ////                this.torso.animations.play('normal');
        ////            } else if (this._gun.angle > -15) {
        ////                this.torso.animations.play('upward');
        ////            } else {
        ////                this.torso.animations.play('downward');
        ////            }
        ////        } else {
        ////             if(distance > this.followDistance){
        ////            this.body.velocity.x = this.speed;
        ////                      } else {
        ////                          this.body.velocity.x = 0; 
        ////                      }
        ////            this.legs.scale.setTo(1.0, 1.0);
        ////            this.torso.scale.setTo(1.0, 1.0);
        ////            this._gun.scale.setTo(1.0, 1.0);
        ////            if (this._gun.angle > -20 && this._gun.angle < 20) {
        ////                this.torso.animations.play('normal');
        ////            } else if (this._gun.angle > -20) {
        ////                this.torso.animations.play('upward');
        ////            } else {
        ////                this.torso.animations.play('downward');
        ////            }
        ////        }
        //
        //
        //
        //
        //        //        if (this._up.isDown && this.body.blocked.down || this._up.isDown && this.onBarrier) {
        //        //            this.body.velocity.y = -220;
        //        //            this.onBarrier = false;
        //        //        }
        //
        //    
        //            if (this.body.velocity.x > 0) {
        //                this.legs.animations.play('walk');
        //            } else if (this.body.velocity.x < 0) {
        //                this.legs.animations.play('backwards');
        //            } else {
        //                this.legs.animations.play('stand');
        //            }



    }
}