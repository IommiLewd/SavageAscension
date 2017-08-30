class SimpleLevel extends Phaser.State {
    constructor() {
        super();
    }

    _loadLevel() {
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.game.world.setBounds(0, 0, 1600, 900);
        this.game.stage.backgroundColor = "#1b2823";
        this.gradient = this.game.add.tileSprite(0, 0, 1600, 900, 'gradient');
        console.log('width is' + this.game.world.width)
        this._loadCameraTarget();
        this.UpperBound = this.game.add.tileSprite(0, 0, this.game.world.width, 32, 'outOfBounds');
        this.lowerBound = this.game.add.tileSprite(0, 868, this.game.world.width, 32, 'outOfBounds');
    }
    _addController() {
        //        this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
        //        this.game.touchControl.inputEnable();
        this._left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this._right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this._up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this._down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    }

    _addPlayer() {
        this.player = new Player(this.game, 500, this.game.height / 2, 'testSheet');
        // this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON); 
    }


    _loadCameraTarget() {
        this.cameraTarget = this.game.add.image(200, 200, 'crossHair');
        this.cameraTarget.anchor.setTo(0.5);
        this.game.camera.follow(this.cameraTarget);
    }


    _barrierGenerator() {
        this.barrier = new barrierGenerator(this.game, 5);
    }

    _checkCollision() {
        this.game.physics.arcade.collide(this.barrier.barrierGroup, this.player, this.processHandler, this.playerOnBarrier);
        this.game.physics.arcade.overlap(this.player, this.barrier.barrierGroup, this.onCollision, this.playerOnBarrier);
    }

    playerOnBarrier(player) {
        player.onBarrier = true;
    }

    processhandler(player, barrier) {
        return true;
    }

    preload() {}

    create() {
        this.enemies = this.game.add.group();
        this._loadLevel();
        this._barrierGenerator();
        this._addController();
        this._addPlayer();
        // this._addEnemy();

    }

    update() {
        //        this.enemies.forEachAlive(function (enemy) {
        //            enemy.playerX = this.player.x;
        //            enemy.playerY = this.player.y;
        //        }, this)

        var midX = (this.player.x + 0 + this.game.input.worldX) / 2;
        var midY = (this.player.y + 0 + this.game.input.worldY) / 2;
        this.cameraTarget.x = midX;
        this.cameraTarget.y = midY;

        this._checkCollision();

        if (this._left.isDown) {
            this.player.body.velocity.x = -190;
        } else if (this._right.isDown) {
            this.player.body.velocity.x = 190;
        } else {
            this.player.body.velocity.x = 0;
        }

        if (this._up.isDown && this.player.body.blocked.down) {
            this.player.body.velocity.y = -500;
        }

        if (this._up.isDown && this.player.onBarrier) {
            this.player.body.velocity.y = -600;
            this.player.onBarrier = false;
        }


    }
}