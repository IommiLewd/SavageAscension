class SimpleLevel extends Phaser.State {
    constructor() {
        super();
    }

    _loadLevel() {
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.game.stage.backgroundColor = "#1b2823";

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
        this.player = new Player(this.game, this.game.width / 2, this.game.height / 2, 'testSheet');
    }

//    _addEnemy() {
//        this.enemy = new Enemy(this.game, 200, 200, 'enemySheet');
//        this.enemies.add(this.enemy);
//    }
    
    _barrierGenerator(){
    this.barrier = new barrierGenerator(this.game);
    }

        _checkCollision() {
            if (this.player.overlap(this.barrier.barrier)) {
              this.player.onBarrier = true;
            }  else {
                    this.player.onBarrier = false;
                }
            
            
            
            this.game.physics.arcade.collide(this.barrier.barrier, this.player);
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
        this.enemies.forEachAlive(function (enemy) {
            enemy.playerX = this.player.x;
            enemy.playerY = this.player.y;
        }, this)
        
        
        
        
this._checkCollision();
        console.log(this.onBarrier);
        if(this._left.isDown){
        this.player.body.velocity.x = -190;
        } else if (this._right.isDown){
            this.player.body.velocity.x = 190;
        } else {this.player.body.velocity.x = 0;}
        
        if(this._up.isDown && this.player.body.blocked.down){
            this.player.body.velocity.y = -500;
        } 
        
        if(this._up.isDown && this.player.onBarrier){
            this.player.body.velocity.y = -500;
        }
//        else if(this._up.isDown) {
//            this.player.body.velocity.y = - 120;
//        }
//        
//        this.player.body.velocity.x = this.game.touchControl.speed.x *= -1;
//        // this.player.body.velocity.y = this.game.touchControl.speed.y *= -1;
//        if (this.game.touchControl.speed.y > 110 && this.player.body.blocked.down) {
//            this.player.body.velocity.y = -400;
//        }

    }
}