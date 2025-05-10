class SmallChicken extends CoolidableObject {
    y = 385;
    originY = 385;
    h = 50;
    w = 50;
    damage = 2;
    energy = 100;
    speed = 1;
    

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    IMAGES_WALKING =  [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    AUDIO_HURT = ASSERTS["audios"]["audio/small_chicken_hurt.wav"];

     /** Smallchicken constructor */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = getRandomNum(960, LEVEL_1_END_X + 720);
        this.speed = getRandomNumFloat(0.15, 1);
        this.animate();
        this.applyGravity();
    }

    /** Set Smallchicken in motion */
    animate() {
        setStoppableInterval(() => {
            if (gameIsPaused) return;
            this.moveLeft();
            if(!this.isAboveGround()) {
                this.jump();
            }
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

    /** Check if smallchicken can jump */
    canJump() {
        return !this.isAboveGround();
    }

    /** Smallchicken jumps */
    jump() {
        this.speedY = 20;
    }

    /** Check if smallchicken is above ground */
    isAboveGround() {
        return this.y < 385;
    }
}