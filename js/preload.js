class Preload extends Phaser.State {
    preload() {
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.load.script('simpleLevel', 'js/map/simplelevel.js');
        this.load.script('controller', 'js/entity/controller.js');
        this.load.script('player', 'js/entity/player.js');
        this.load.script('barrierGenerator', 'js/entity/barrierGenerator.js');
         this.load.image('player', 'img/player.png');
         this.load.image('pointer', 'img/laserpointer.png');
        this.load.image('barrier', 'img/barrier.png');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //Controller files
        this.load.image('compass', 'img/navigator.png');
        this.load.image('touch_segment', 'img/indicator.png');
        this.load.image('touch_segment2', 'img/indicator2.png');
        this.load.image('touch', 'img/touch.png');



    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('SimpleLevel', SimpleLevel);
        this.game.state.start('SimpleLevel');
    }

}