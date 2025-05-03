class ThrowableObject extends CoolidableObject {
    x = 100;
    y = 100;
    w = 50;
    h = 60;
    speed = 12;

    intervalIDs = [];

    isRemovable = false;
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

    constructor(x, y, speedDirection) {
        super().loadImage("/img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGEG_BROKEN);

        this.throw(x, y, speedDirection);
        this.animate();
    }


    animate() {
        let id = setStoppableInterval(()=>{
             if(!this.isAboveGround()) {
                this.bottleBroken();
            } else {
                this.playAnimation(this.IMAGES_ROTATING);
            }
        }, 50);

        this.intervalIDs.push(id);
    }

    bottleBroken() {
        this.playAnimation(this.IMAGEG_BROKEN);
        this.speed = 0;
        if (!this.lastHitGround) {
            this.lastHitGround = getTimestamp();     
        }
        if(getTimeElapsedInSecond(this.lastHitGround) > 0.001) {
            this.isRemovable = true;
        }
    }

    throw(x, y, speedDirection) {
        this.x = x;
        this.y = y;
        this.speedY = 15;
        this.applyGravity();

        let id = setStoppableInterval(() => {
            this.x += (this.speed * speedDirection);
        }, 25);
        this.intervalIDs.push(id);
    }

    isAboveGround() {
        return this.y < 350;
    }

    destroySelf() {
        this.intervalIDs.forEach(clearInterval);
    }

}
