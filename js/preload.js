class Preload extends Phaser.State {
    preload() {
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.load.script('simpleLevel', 'js/map/simplelevel.js');
        this.load.script('controller', 'js/entity/controller.js');
        this.load.script('player', 'js/entity/player.js');
        this.load.script('ally', 'js/entity/ally.js');
        this.load.script('enemy', 'js/entity/enemy.js');
        this.load.script('userInterface', 'js/entity/userInterface.js');
        this.load.script('barrierGenerator', 'js/entity/barrierGenerator.js');

        this.load.image('pointer', 'img/laserpointer.png');

        this.load.image('enemy', 'img/enemy.png');
        this.load.image('tile', 'img/groundTile.png');
        this.load.image('playerMarker', 'img/playerMarker.png');

    
        //Background

        this.load.image('gradient', 'img/finGradient.png');
        this.load.image('background', 'img/scrollingBackground.png');

        //New Player graphics
        this.load.image('whiteSpace', 'img/emptySprite.png');
//        this.load.image('gun', 'img/gun.png');
        this.load.spritesheet('gun', 'img/gunAnimation.png', 48, 12, 3);
        this.load.spritesheet('torsos', 'img/torsos.png', 42, 38, 8);
        this.load.spritesheet('legs', 'img/legs.png', 88, 30, 8);
        
        
        //enemies
        this.load.spritesheet('charger', 'img/Dynastinae.png', 180, 100, 15);

        //Gun related
        this.load.image('crossHair', 'img/crossHair.png');
        this.load.spritesheet('bullet', 'img/bullet.png', 38, 6, 3);
        this.load.spritesheet('blueFlame', 'img/blueFlameSpritesheet.png', 10, 10, 3);




    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('SimpleLevel', SimpleLevel);
        this.game.state.start('SimpleLevel');
    }
   

}