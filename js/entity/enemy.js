class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key, type) {
        super(game, x, y, 'enemySheet', type);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5, 1.0);
        this.game.physics.arcade.enableBody(this);
        this._addAnimations();
        this.idle = true;
        this.idleTimer = 2000;
        this.idleNow = 0;
        this.body.velocity.x = 40;
        this.body.velocity.y = 40;
        this.body.collideWorldBounds = true;
        this.playerX = 0;
        this.playerY = 0;
    }

    _addAnimations() {
        this.animations.add('down', [0, 1, 2], 8, true);
        this.animations.add('right', [3, 4, 5], 8, true);
        this.animations.add('up', [6, 7, 8], 8, true);
        this.animations.add('left', [9, 10, 11], 8, true);
    }

    _idleMovement() {
        this.idleNow = this.game.time.now + this.idleTimer;
        this.body.velocity.y = Math.floor(Math.random() * 50) - 20;
        this.body.velocity.x = Math.floor(Math.random() * 50) - 20;
        var random1 = Math.random();
        var random2 = Math.random();
        if (random1 > 0.5) {
            this.body.velocity.x *= -1;
        }
        if (random2 > 0.5) {
            this.body.velocity.y *= -1;
        }
    }

    _attackMovement() {
   this.game.physics.arcade.moveToXY(this, this.playerX, this.playerY, 70, undefined);
    }





    update() {
        console.log(Phaser.Math.distance(this.x, this.y, this.playerX, this.playerY));
        var distance = Phaser.Math.distance(this.x, this.y, this.playerX, this.playerY);

        if (distance < 120) {
            this.idle = false;
        } else {
            this.idle = true;
        }

        if (this.idle) {
            if(this.game.time.now > this.idleNow){
            this._idleMovement();
        }} else {
            this._attackMovement();
        }


        if (this.body.velocity.x > 0 && this.body.velocity.y < 50 && this.body.velocity.y > -50) {
            this.animations.play('right');
        } else if (this.body.velocity.x < 0 && this.body.velocity.y < 50 && this.body.velocity.y > -50) {
            this.animations.play('left');
        } else if (this.body.velocity.y < 0 && this.body.velocity.x < 50 && this.body.velocity.x > -50) {
            this.animations.play('up');
        } else if (this.body.velocity.y > 0 && this.body.velocity.x < 50 && this.body.velocity.x > -50) {
            this.animations.play('down');
        } else if (this.body.velocity.y === 0 && this.body.velocity.x === 0) {
            this.animations.stop(0, true);
        }
    }
}