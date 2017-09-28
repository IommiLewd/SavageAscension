class barrierGenerator extends Phaser.Sprite {
    constructor(game, amount) {
        super(game, amount);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 0.3);
        this.tileGroup = this.game.add.group();
        this.tileGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.tileGroup.enableBody = true;
        this.tileGroup.createMultiple(50, 'tile');
        this.tileGroup.setAll('immovable', true);
        this._generateFloor();
    }


    _generateFloor() {
        var fillWidth = this.game.world.width / 64 + 6;
        var initial = 0;
        for (var i = 0; i < fillWidth; i++) {
            this.floorTile;
            this.floorTile = this.tileGroup.getFirstDead();
            this.floorTile.reset(initial, this.game.world.height - 64);
            this.floorTile.body.immovable = true;
            this.tileGroup.add(this.floorTile);
            initial += 64;

        }


    }

//    _generateTile() {
//        var dogsbody = this.tileGroup.width;
//        dogsbody = Math.floor(dogsbody);
//        console.log(this.tileGroup.width);
//        this.floorTile;
//        this.floorTile = this.tileGroup.getFirstDead();
//        this.floorTile.reset(this.tileGroup.width - 2, this.game.world.height - 64);
//        this.floorTile.body.immovable = true;
//        this.tileGroup.add(this.floorTile);
//
//    }

    update() {
        this.tileGroup.forEach(function (tile) {
            tile.body.velocity.x = -20;
            if (tile.x < -64) {
                tile.x = this.tileGroup.width - 66;
                //tile.kill();
                //this._generateTile();
            }
        }, this)


    }
}