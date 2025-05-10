class SmallChicken extends CoolidableObject {
    y = 385;
    originY = 385;
    h = 40;
    w = 40;
    damage = 2;
    energy = 100;
    speed = 1;
    

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = getRandomNum(960, LEVEL_1_END_X + 720);
        this.speed = getRandomNumFloat(0.15, 1);
        this.animate();
        this.applyGravity();
    }

    animate() {
        // this.jump();
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

    canJump() {
        return !this.isAboveGround();
    }

    jump() {
        this.speedY = 20;
    }

    isAboveGround() {
        return this.y < 385;
    }
}