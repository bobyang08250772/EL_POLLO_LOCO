class World {
    character = new Character();
    statusBar = new StatusBar();
    imageTextBarBottle = new ImageTextBarBottle(10, 60, 80, 50, SALSA_BOTTLE_PATH);
    imageTextBarCoin = new ImageTextBarCoin(100, 32, 110, 110, COIN_PATH);
    throwableObjects = [];
    
    
    level = level1;

    ctx;
    canvas;
    kb;
    camera_x = 0;

    constructor(canvas, kb) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.kb = kb;
        this.draw();
        this.setWorld();
        this.gaming();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        if (this.level) {
            this.drawAllObject();
        }
    }

    drawAllObject() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.groundBottles);
        this.addObjectsToMap(this.throwableObjects);

        this.drawFixedObjects();
        
        this.ctx.translate(-this.camera_x, 0);
        this.requrestAnimation();
    }

    requrestAnimation() {
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.imageTextBarBottle);
        this.addToMap(this.imageTextBarCoin);
        this.ctx.translate(this.camera_x, 0);

    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });    
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        if (mo.drawFrame) {
            mo.drawFrame(this.ctx);
        }

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.w, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    gaming(){
        let self = this;
        this.checkingAnyChange(self);
        this.removeDisappearedObject(self); 
    }

    checkingAnyChange(self) {
        setStoppableInterval(() => {
            self.checkCharacterWithEnemies();
            self.checkCharacterWithCoins();
            self.checkThrowobjects();
        }, 100);
    }

    removeDisappearedObject(self) {
        setStoppableInterval(() => {
            self.removeGroundedBottles();
        }, 200);
    }

    checkCharacterWithEnemies() {
        this.level.enemies.forEach(e => {
            if (this.character.isColliding(e)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCharacterWithCoins() {
        for (let index = 0; index < this.level.coins.length; index++) {
            const coin = this.level.coins[index];
            if (this.character.isColliding(coin)) {
                this.imageTextBarCoin.text += 1;

                coin.x = 100;
                coin.y = 200;
                // this.ctx.translate(this.camera_x, 0);
                console.log(this.camera_x);
                
                coin.moveAway(100 - this.camera_x,100);
                // this.ctx.translate(-this.camera_x, 0);
                
                // coin.destroySelf();
                // this.level.coins.splice(index, 1);
                // index --;
            }
        }
    }

    checkThrowobjects() {
        
        if(this.kb.D) {
            let speedDirection = 1;
            let x = this.character.x + this.character.w - this.character.offset.right;

            if (this.character.otherDirection)  {
                speedDirection = -1;
                x = this.character.x + this.character.offset.left;
            }
            let bottole = new ThrowableObject(x, this.character.y + this.character.offset.top, speedDirection);
            this.throwableObjects.push(bottole);
        }
    }

    removeGroundedBottles() {
        for (let index = 0; index < this.throwableObjects.length; index++) {
            let bottle = this.throwableObjects[index];
            if (!bottle.isAboveGround() && bottle.isRemovable) {
                bottle.destroySelf();
                this.throwableObjects.splice(index, 1);
                index --;  
            }
              
        }
    }
 
}