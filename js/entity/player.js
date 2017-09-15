class Player extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, 'player');
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 900;
        this.body.bounce.setTo(0.2);
        this._initLaser();
        this._addAnimations();
        this.onBarrier = false;
        this.doubleJump = false;
        this.body.setSize(38, 60, 0, 0);
        this._initLegs();


    }

    _addAnimations() {

        //                //this.animations.add('up', [11, 12, 13, 14], 10, true);
        //                this.animations.add('up', [6, 7, 8,9], 10, true);
        //                this.animations.add('left', [16, 17, 18, 19], 10, true);
    }

    _initLegs() {
        this._Legs = this.game.add.sprite(0, 30, 'legs');
        this._Legs.anchor.setTo(0.5);
        this.addChild(this._Legs);




        this._Legs.animations.add('still', [0], 10, true);
        this._Legs.animations.add('towardsFacing', [4, 5, 6, 7], 10, true);
        this._Legs.animations.play('towardsFacing');

    }


    _initLaser() {
        this._laser_pointer = this.game.add.tileSprite(0, 6, 768, 0.5, 'pointer');
        this.addChild(this._laser_pointer);
        this._gun = this.game.add.image(-5, 8, 'gun');
        this._gun.anchor.setTo(0.0, 0.5);
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