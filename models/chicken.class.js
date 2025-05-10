class Chicken extends CoolidableObject {
    y = 365;
    h = 60;
    w = 70;
    damage = 2;
    speed = 1;
    

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    }

    IMAGES_WALKING =  [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    AUDIO_HURT = ASSERTS["audios"]["audio/chicken_hurt.mp3"];

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = getRandomNum(480, LEVEL_1_END_X + 720);
        this.speed = getRandomNumFloat(0.1, 1.5);
        
        this.animate();
    }

    

    animate() {
       

        setStoppableInterval(() => {
            if (gameIsPaused) return;
            this.moveLeft();
        }, 1000 / 60);

        setStoppableInterval(()=> {
            if (gameIsPaused) return;
            if(!this.energy) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
            
        }, 100);
    }
}