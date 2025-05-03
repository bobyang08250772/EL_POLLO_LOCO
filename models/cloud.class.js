class Cloud extends MovableObject {
    
    y = 50;
    w = 500;
    h = 250;
    speed = 0.15;

    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");

        this.x = Math.random() * 3600;
        this.animate();
    }

    animate() {
        setStoppableInterval(()=> {
            this.moveLeft();
        }, 1000 / 60)
       
    }
}