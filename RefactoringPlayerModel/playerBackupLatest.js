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
        this._initTorso();
        this._addAnimations();
        this.facingLeft = false;
        this.onBarrier = false;
        this.doubleJump = false;
        this.movement = false;
        this.body.setSize(38, 67, 0, 0);
        this._initLegs();
        this._initLaser();

    }

    _addAnimations() {
        this._torso.animations.add('levelFacing', [0], 10, true);
        this._torso.animations.add('downwardFacing', [2], 10, true);
        this._torso.animations.add('upwardFacing', [1], 10, true);
        this._torso.animations.play('levelFacing');

    }

    _initLegs() {
        this._Legs = this.game.add.sprite(-2, 16, 'legs');
        this._Legs.anchor.setTo(0.5);
        this.addChild(this._Legs);
        this._Legs.animations.add('towardsStill', [0], 10, true);
        this._Legs.animations.add('awayStill', [6], 10, true);
        this._Legs.animations.add('towardsFacing', [1, 2, 3, 4], 8, true);
        this._Legs.animations.add('awayFacing', [6, 7, 8, 9], 8, true);
        this._Legs.animations.add('jumpLeft', [12], 8, true);
        this._Legs.animations.add('jumpRight', [13], 8, true);
        // this._Legs.animations.play('towardsFacing');
        this._Legs.animations.play('towardsStill');
    }


    _initTorso() {
        this._torso = this.game.add.sprite(0, 0, 'torso');
        this._torso.anchor.setTo(0.5, 1.0);
        this.addChild(this._torso);
    }
    
    
    _fireWeapon(){
       this._gun.animations.play('firing');
    }
    
    _notfiring(){
        this._gun.animations.play('notFiring');
    }

    _initLaser() {
        this._laser_pointer = this.game.add.tileSprite(0, 0, 768, 0.5, 'pointer');
        this.addChild(this._laser_pointer);
        this._gun = this.game.add.image(0, 0, 'gun');
        this._gun.anchor.setTo(0.0, 0.5);
        this.addChild(this._gun);
     this._gun.animations.add('firing', [0, 1, 2], 40, true);
       this._gun.animations.add('notFiring', [0], 10, true);

    }


    update() {
        this._laser_pointer.rotation = this.game.physics.arcade.angleToPointer(this);
        this._gun.rotation = this.game.physics.arcade.angleToPointer(this);

        console.log(this._gun.angle);
        //        
        if (this._gun.rotation < -0.5) {
            this._torso.animations.play('upwardFacing');

        } else if (this._gun.rotation > -0.5 && this._gun.rotation < 0.5 /*|| this._gun.angle > -150 && this._gun.rotation > 2.5 */ ) {
            this._torso.animations.play('levelFacing');

        } else if (this._gun.rotation > 0.5) {
            this._torso.animations.play('downwardFacing');

        }

        if (this.body.velocity.y > -70) {


            if (this.body.velocity.x < 0 && this.onBarrier) {
                this._Legs.animations.play('awayFacing');
            } else if (this.body.velocity.x > 0 && this.onBarrier) {
                this._Legs.animations.play('towardsFacing');
            } else {
                if(this.facingLeft === false){
                this._Legs.animations.play('towardsStill');
                } else {
                    this._Legs.animations.play('awayStill');
                }
            }








        } else {
if(this.facingLeft === false){
            this._Legs.animations.play('jumpLeft');
} else {
        this._Legs.animations.play('jumpRight');
}
        }


    }
}