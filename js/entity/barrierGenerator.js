class barrierGenerator extends Phaser.Sprite {
    constructor(game, amount) {
        super(game, amount);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.3);
        this._addBarriers();
        this.numberOfBarriers = amount;
    }


    _addBarriers() {
       // for (var i = 0; i < this.numberOfBarriers; i++) {
            this.barrier = this.game.add.tileSprite(20, 460, 320, 32, 'barrier');
            this.game.physics.arcade.enableBody(this.barrier);
            this.barrier.body.immovable = true;
       // }
    }


    update() {
        this.barrier.body.velocity.y = -70;
        if (this.barrier.y < -40) {
            this.barrier.y = 492;
        }
    }
}