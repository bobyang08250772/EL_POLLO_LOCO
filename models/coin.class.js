class Coin extends Collectable {
    y = 365;
    h = 60;
    w = 70;

    speedY = 1;
    speed = 2;
    accelerationY = 1;
    accelerationX = .5;


    offset = {
        left: 25,
        right: 25,
        top: 20,
        bottom: 20
    }

    IMAGES = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png"
    ];


    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.animate();
        // this.moveAway(100, 100);

        this.x = getRandomNum(100, LEVEL_1_END_X);
        this.y = getRandomNum(120, 380);
        console.log(this.y);
        
    }

    animate() {
        let id = setStoppableInterval(()=>{
            this.playAnimation(this.IMAGES);
        }, 1000/60);

        this.intervalIDs.push(id);
    }

    moveAway(desX, desY) {
        let self = this;
        let id = setStoppableInterval(() => {
            if (self.y > desY) {
                self.y -= self.speedY;
                self.speedY += self.accelerationY;
            }
            if (self.x > desX) {
                self.x -= self.speed;
                self.speed += self.accelerationX;

            }
        },  1000 / 60);
    }

}