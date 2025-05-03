class MovableObject extends DrawableObject{
    
    speed = 0.15;
    otherDirection = false;

    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {}

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
    
   

    
}