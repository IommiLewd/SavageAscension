class barrierGenerator extends Phaser.Sprite {
    constructor(game, amount) {
        super(game, amount);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.3);
        this.numberOfBarriers = 0;
        this.barrierGroup = this.game.add.group();
        this.xModifier = 40;
        this.yModifier = 40;
        this._addBarrier();
        this.game.time.events.loop(Phaser.Timer.SECOND * 7, this._addBarrier, this);

    }


    _addBarrier() {
        console.log('Barrier Generated, number of barriers is' + this.numberOfBarriers);
        if (this.numberOfBarriers % 4 === 0) {
            //this._barrierGenerator();
            this._floorGenerator();
            console.log('floor Generated');
        } else {
            this._barrierGenerator();
            console.log('single platform');
        }

        this.numberOfBarriers++;
    }


    //
    _floorGenerator() {
        for (var i = 0; i < 2; i++) {
            if (i % 2 === 0) {
                this.floorCalc = Math.random() * (1200 - 100) + 100;
                this.barrier = this.game.add.tileSprite(0, 920, this.floorCalc, 36, 'barrier2');
                this.game.physics.arcade.enableBody(this.barrier);
                this.barrier.body.immovable = true;
                this.barrierGroup.add(this.barrier);
            } else {
                this.barrier = this.game.add.tileSprite(this.floorCalc + 240, 920, this.game.world.width - this.floorCalc + 128, 36, 'barrier2');
                this.yModifier += 450;
                this.game.physics.arcade.enableBody(this.barrier);
                this.barrier.body.immovable = true;
                this.barrierGroup.add(this.barrier);
            }
        }

    }

    _barrierGenerator() {
        this.barrierWidth = Math.random() * (1200 - 100) + 100;
        this.barrier = this.game.add.tileSprite(this.barrierWidth, 920, 448, 36, 'barrier2');
        this.game.physics.arcade.enableBody(this.barrier);
        this.barrier.body.immovable = true;
        this.barrierGroup.add(this.barrier);

    }




    _barrierRandomize(barrier) {
        this.barrierWidth = Math.random() * (1200 - 100) + 100;
        barrier.x = this.barrierWidth;
    }


    //    _barrierRandomize(barrier) {
    //        this.barrierWidth = Math.random() * (1200 - 100) + 100;
    //        barrier.x = this.barrierWidth;
    //        barrier.width = this.game.world.width;
    //        barrier.body.width = this.game.world.width;
    //    }


    update() {



        this.barrierGroup.forEach(function (barrier) {
            barrier.body.velocity.y = -40;
            if (barrier.y < -40) {
                // this._barrierRandomize(barrier);
                //barrier.y = 930;
                barrier.kill();
            }
        }, this)

        //        this.barrier.body.velocity.y = -70;
        //        if (this.barrier.y < -40) {
        //            this.barrier.y = 492;
        //        }
    }
}