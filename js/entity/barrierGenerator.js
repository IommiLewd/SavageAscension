class barrierGenerator extends Phaser.Sprite {
    constructor(game, amount) {
        super(game, amount);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.3);
        this.numberOfBarriers = 0;
        this.barrierGroup = this.game.add.group();
        this.barrierGroup.enableBody = true;
        this.barrierGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.barrierGroup.createMultiple(50, 'floor');
        this.barrierGroup.setAll('immovable', true);
        this.xModifier = 40;
        this.yModifier = 40;
        this.game.time.events.loop(Phaser.Timer.SECOND * 7, this._addBarrier, this);
        
        this._initialBarrier();

    }



    _addBarrier() {
        if (this.numberOfBarriers % 4 === 0) {
            this._floorGenerator();
        } else {
            this._barrierGenerator();
        }

        this.numberOfBarriers++;
    }

    _initialBarrier() {
        var initial = 40;
        for (var i = 0; i < 2; i++) {
            this.barrier;
            this.barrier = this.barrierGroup.getFirstDead();
            this.barrier.reset(initial, 640);
            this.barrier.body.immovable = true;
            this.barrierGroup.add(this.barrier);
            initial += 192;
        }
    }


    _barrierGenerator() {
        this.barrierWidth = Math.random() * (1150 - 100) + 100;
        for (var i = 0; i < 2; i++) {
            this.barrier;
            this.barrier = this.barrierGroup.getFirstDead();
            this.barrier.reset(this.barrierWidth, 920);
            this.barrierWidth += 192;
            this.barrier.body.immovable = true;
            this.barrierGroup.add(this.barrier);
        }
    }


    _floorGenerator() {
        var floorWidth = 192;
        var floorX = 0;
        this.floorCalc = Math.ceil(Math.random() * (4 - 1 + 1)) + 1;
        for (var i = 0; i < 8; i++) {
            if (i === this.floorCalc) {
                floorX += floorWidth;
            } else {
                this.barrier;
                this.barrier = this.barrierGroup.getFirstDead();
                this.barrier.reset(floorX, 920);
                this.barrier.body.immovable = true;
                this.barrierGroup.add(this.barrier);
                floorX += floorWidth;
            }
            if (this.floorCalc <= 3) {
                console.log('spawn right');
            } else {
                console.log('spawn left');
            }
        }
    }




    update() {



        this.barrierGroup.forEach(function (barrier) {
            barrier.body.velocity.y = -40;
            if (barrier.y < -40) {
                barrier.kill();
            }
        }, this)

    }
}