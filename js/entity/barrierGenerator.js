class barrierGenerator extends Phaser.Sprite {
    constructor(game, amount) {
        super(game, amount);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.3);
        this.numberOfBarriers = amount;
        this.barrierGroup = this.game.add.group();
        this.xModifier = 40;
        this.yModifier = 40;
        this._addBarriers();
        

    }


    _addBarriers() {
        for (var i = 0; i < this.numberOfBarriers; i++) {
            this.barrier = this.game.add.tileSprite(400 + this.xModifier, 350 + this.yModifier, 300 , 32, 'barrier');
            this.xModifier += 150;
            this.yModifier += 360;
            this.game.physics.arcade.enableBody(this.barrier);
            this.barrier.body.immovable = true;
            this.barrierGroup.add(this.barrier);
        }
    }


    update() {



        this.barrierGroup.forEach(function(barrier) {
                barrier.body.velocity.y = -70;
                if (barrier.y < -40) {
                    barrier.y = 930;
                }
            }, this)
        
            //        this.barrier.body.velocity.y = -70;
            //        if (this.barrier.y < -40) {
            //            this.barrier.y = 492;
            //        }
    }
}