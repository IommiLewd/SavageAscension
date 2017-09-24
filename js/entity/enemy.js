class Enemy extends Phaser.Sprite {
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
        this.playerX = 300;
        this.playerY = 300;

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
   
var angle = Math.atan2(this.playerY - this.world.y, this.playerX - this.world.x );
angle = angle * (180/Math.PI);
this._gun.angle = angle;

        console.log(Phaser.Math.distance(this.playerX , this.playerY , this.world.x  , this.world.y) + 'distance');
        
        var distance = Phaser.Math.distance(this.playerX , this.playerY , this.world.x  , this.world.y);
        
        
        if (this.playerX < this.world.x) {
            if(distance > 190){
            this.body.velocity.x = -90;
            } else {
                          this.body.velocity.x = 0; 
                      }
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
             if(distance > 190){
            this.body.velocity.x = 90;
                      } else {
                          this.body.velocity.x = 0; 
                      }
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