class Preload extends Phaser.State {
    preload() {
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.load.script('simpleLevel', 'js/map/simplelevel.js');
        this.load.script('controller', 'js/entity/controller.js');
        this.load.script('player', 'js/entity/player.js');
        this.load.script('enemy', 'js/entity/enemy.js');
        this.load.script('userInterface', 'js/entity/userInterface.js');
        this.load.script('barrierGenerator', 'js/entity/barrierGenerator.js');
        this.load.image('player', 'img/constructionDroneDisc.png');
        this.load.image('wheel', 'img/constructionDroneWheel.png');
        this.load.image('pointer', 'img/laserpointer.png');
        this.load.image('outOfBounds', 'img/outOfBounds.png');
        this.load.image('enemy', 'img/enemy.png');


        //Background
       // this.load.image('gradient', 'img/kritaBackground.png');
        this.load.image('gradient', 'img/finGradient.png');
        this.load.image('background1', 'img/tileTower1.png');
        this.load.image('background2', 'img/kritaBackground3.png');


        //Barriers
        this.load.image('barrier', 'img/barrier.png');
        this.load.image('barrier2', 'img/barrier2.png');
        this.load.image('floor', 'img/floorBarrier.png');

        //Gun related
        this.load.image('crossHair', 'img/crossHair.png');
        this.load.image('gun', 'img/gun.png');
        this.load.spritesheet('bullet', 'img/bullet.png', 38, 6, 3);
        this.load.spritesheet('blueFlame', 'img/blueFlameSpritesheet.png', 10, 10, 3);

        //Player Related
        this.load.spritesheet('legs', 'img/Legs.png', 26, 24, 11);
        this.load.spritesheet('player', 'img/torsos.png', 38, 38, 3);



        //Controller files
        //        this.load.image('compass', 'img/navigator.png');
        //        this.load.image('touch_segment', 'img/indicator.png');
        //        this.load.image('touch_segment2', 'img/indicator2.png');
        //        this.load.image('touch', 'img/touch.png');



    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('SimpleLevel', SimpleLevel);
        this.game.state.start('SimpleLevel');
    }

}