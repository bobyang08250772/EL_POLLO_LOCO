class ThrowableObject extends CoolidableObject {
    x = 100;
    y = 100;
    groundY = 371;
    w = 50;
    h = 60;
    speed = 12;
    damage = 10;

    offset = {
        left: 20,
        right: 20,
        top: 15,
        bottom: 15
    }

    isBroken = false;
    lastHitGround;

    IMAGEG_BROKEN =  [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    IMAGES_ROTATING = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    AUDIO_BROKEN = ASSERTS["audios"]["audio/bottle_shatter.mp3"];

    constructor(x, y, speedDirection) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGEG_BROKEN);

        this.throw(x, y, speedDirection);
        this.animate();
    }

    animate() {
        let id = setStoppableInterval(()=>{
            if (gameIsPaused) return;

             if(!this.isAboveGround() || this.isBroken) {
                this.playAnimation(this.IMAGEG_BROKEN);

                // Animation played only once
                if (this.currentImage == this.IMAGEG_BROKEN.length) {
                    this.destroySelf();
                }
            } else {
                this.playAnimation(this.IMAGES_ROTATING);
            }
        }, 50);

        this.intervalIDs.push(id);
    }

    enemyTouche() {
        this.isBroken = true;
    }

    throw(x, y, speedDirection) {
        this.x = x;
        this.y = y;
        this.speedY = 15;
        this.applyGravity();

        let id = setStoppableInterval(() => {
            if (gameIsPaused) return;
            this.x += (this.speed * speedDirection);
        }, 25);
        this.intervalIDs.push(id);
    }

    isAboveGround() {
        return this.y < 350;
    }

    

}
