class Player extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, 'player');
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 900;
        this._initLaser();
        this._addAnimations();
        this.onBarrier = false;
        this.doubleJump = false;
  

    }

    _addAnimations() {
        //        this.animations.add('down', [1, 2, 3,4], 10, true);
        //        this.animations.add('right', [11, 12, 13, 14], 10, true);
        //        //this.animations.add('up', [11, 12, 13, 14], 10, true);
        //        this.animations.add('up', [6, 7, 8,9], 10, true);
        //        this.animations.add('left', [16, 17, 18, 19], 10, true);
    }
    



    _initLaser() {
        this._laser_pointer = this.game.add.tileSprite(0, 0, 768, 0.5, 'pointer');
        this.addChild(this._laser_pointer);
        this._gun = this.game.add.image(0, 0, 'gun');
        this._gun.anchor.setTo(0.5);
        this.addChild(this._gun);
    }



    update() {
        this._laser_pointer.rotation = this.game.physics.arcade.angleToPointer(this);
    this._gun.rotation = this.game.physics.arcade.angleToPointer(this);



        //        if (this.body.velocity.x > 0 && this.body.velocity.y < 50 && this.body.velocity.y > -50) {
        //            this.animations.play('right');
        //            this.restFrame = 10;
        //        } else if (this.body.velocity.x < 0 && this.body.velocity.y < 50 && this.body.velocity.y > -50) {
        //            this.animations.play('left');
        //            this.restFrame = 15;
        //        } else if (this.body.velocity.y < 0 && this.body.velocity.x < 50 && this.body.velocity.x > -50) {
        //            this.animations.play('up');
        //            this.restFrame = 5;
        //        } else if (this.body.velocity.y > 0 && this.body.velocity.x < 50 && this.body.velocity.x > -50) {
        //            this.animations.play('down');
        //            this.restFrame = 0;
        //        } else if (this.body.velocity.y === 0 && this.body.velocity.x === 0) {
        //            //this.animations.stop(0, true);
        //           this.animations.frame = this.restFrame;
        //        }
    }
}