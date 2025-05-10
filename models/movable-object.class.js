class MovableObject extends DrawableObject{
    
    speed = 0.15;
    otherDirection = false;

    speedY = 0;
    acceleration = 2;
    
    lastHit = 0;

    applyGravity() {
       
        let id = setStoppableInterval(() => {
            if (gameIsPaused) return;
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                
                this.speedY = 0;
                this.y = this.groundY;
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