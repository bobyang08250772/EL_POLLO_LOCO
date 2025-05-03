class Chicken extends CoolidableObject {
    y = 365;
    h = 60;
    w = 70;
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

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);

        this.x = getRandomNum(200, LEVEL_1_END_X);
        this.speed = getRandomNum(0.15, 0.5);
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setStoppableInterval(()=> {
            // Walk animation
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }


}