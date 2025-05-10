class CoolidableObject extends MovableObject {
    collidable = true;
    intervalIDs = [];

    damage = 0;
    energy = 100;

    constructor() {
        super();
    }

    isColliding(mo) {
        return this.x + this.w - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.h - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.w - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.h - mo.offset.bottom;
    }

    hit(damage) {
        this.energy -= damage;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = getTimestamp();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        return getTimeElapsedInSecond(this.lastHit) < .5;
    }

    destroySelf() {
        this.intervalIDs.forEach(clearInterval);
    }
}