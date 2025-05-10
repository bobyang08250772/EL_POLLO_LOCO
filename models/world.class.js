class World {

    requestAnimationFrameID;

    character = new Character();
    statusBar = new StatusBar();
    endBossStatusBar = new EndBossStatusBar();
    imageTextBarBottle = new ImageTextBarBottle(10, 60, 80, 50, SALSA_BOTTLE_PATH);
    imageTextBarCoin = new ImageTextBarCoin(100, 32, 110, 110, COIN_PATH);
    throwableObjects = [];
    
    level = LEVEL1;
    enemiesToRemove = [];
    bottlesToRemove = [];

    ctx;
    canvas;
    kb;
    camera_x = 0;
    isCollected = false;
    colltedBottleCount = 0;

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
        this.level.endBoss.world = this;
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
        this.addToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.groundBottles);
        this.addObjectsToMap(this.throwableObjects);
        this.drawFixedObjects();
        
        this.ctx.translate(-this.camera_x, 0);
        this.requrestAnimation();
    }
    

    requrestAnimation() {
        requestAnimationFrame(()=> {
            this.draw();
        });
    }

    drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        
        if (this.endBossStatusBar.isShowable) this.addToMap(this.endBossStatusBar);
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
        this.checkingAnyChange();
    }

    checkingAnyChange(self) {
        setStoppableInterval(() => {

            this.checkCharacterWithEnemies();
            this.checkCharacterWithEndBoss();
            this.checkCharacterWithCollectable(this.level.coins, this.imageTextBarCoin);
            this.checkCharacterWithCollectable(this.level.groundBottles, this.imageTextBarBottle);
            this.checkThrowObjectWithEnemies();
            this.checkThrowObjectWithEndBoss();
            this.checkThrowableObjectWithGround();
        }, 100);
    }

    checkCharacterWithEnemies() {
        for (let index = 0; index < this.level.enemies.length; index++) {
            const enemy = this.level.enemies[index];
            if (this.character.isColliding(enemy) && this.character.isFalling()) {
                enemy.audioPlay(enemy.AUDIO_HURT);
                this.removeEnemy(enemy);
                this.character.jump(10);
            } else if( this.character.isColliding(enemy) && enemy.energy){
                this.setCharacterEnery(enemy.damage);
            }
        }
    }

    checkCharacterWithEndBoss() {
        if (this.character.isColliding(this.level.endBoss)) {
            this.level.endBoss.isAttacking = true;
            this.setCharacterEnery(this.level.endBoss.damage);
        }
    }


    setCharacterEnery(damage){
        this.character.hit(damage);
        this.statusBar.setPercentage(this.character.energy);
    }

    setEndBossEnergy(damage, currentBottle){
        if (this.level.endBoss.lastBottle != currentBottle) {
            this.level.endBoss.hit(damage);
            this.level.endBoss.lastBottle = currentBottle;
        }
        this.endBossStatusBar.setPercentage(this.level.endBoss.energy);
    }

    checkCharacterWithCollectable(arr, imgTextBar) {
        for (let index = 0; index < arr.length; index++) {
            const collectable = arr[index];
            if (this.character.isColliding(collectable) ) {
                imgTextBar.text += 1;
                imgTextBar.jump();
                if(collectable instanceof GroundBottle) {
                    this.colltedBottleCount ++;
                    this.character.audioPlay(this.character.AUDIO_BOTTLE_COLLECTING);
                } else {
                    this.character.audioPlay(this.character.AUDIO_COIN_COLLECTING);
                }
                collectable.destroySelf();
                arr.splice(index, 1);
                index --;  
            }
        }
    }

    characterShoot() {
        this.character.shooting();
        if(this.colltedBottleCount <= 0) return;

        this.character.audioPlay(this.character.AUDIO_THROWING);
        this.imageTextBarBottle.text = --this.colltedBottleCount;

        this.playBottleAnimation();
    }

    playBottleAnimation(){
        let speedDirection = 1;
        let x = this.character.x + this.character.w - this.character.offset.right;
        if (this.character.otherDirection)  {
            speedDirection = -1;
            x = this.character.x + this.character.offset.left;
        }

        let bottole = new ThrowableObject(x, this.character.y + this.character.offset.top, speedDirection);
        this.throwableObjects.push(bottole);
    }
    
    checkThrowObjectWithEnemies() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];
             for (let j = 0; j < this.level.enemies.length; j++) {
                const enemy = this.level.enemies[j];
                if (bottle.isColliding(enemy)) {
                    bottle.audioPlay(bottle.AUDIO_BROKEN);
                    enemy.audioPlay(enemy.AUDIO_HURT);
                    this.removeBottles(bottle);
                    this.removeEnemy(enemy);
                }
             }
        }
    }

    checkThrowObjectWithEndBoss() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];
             
            if (bottle.isColliding(this.level.endBoss)) {
                this.level.endBoss.audioPlay(this.level.endBoss.AUDIO_HURT);
                this.removeBottles(bottle);
                this.setEndBossEnergy(bottle.damage, bottle);
            }
        }
    }

    checkThrowableObjectWithGround() {
        for (let index = 0; index < this.throwableObjects.length; index++) {
            let bottle = this.throwableObjects[index];
            if ((!bottle.isAboveGround()) ) {
                bottle.audioPlay(bottle.AUDIO_BROKEN);
                this.removeBottles(bottle);
            }
        }
    }

    removeEnemy(enemy) {
        enemy.energy = 0;

        setPushToArrayTimeout300(() => {
            enemy.destroySelf();
            this.enemiesToRemove.push(enemy);
        });
        setRemoveFromArraryTimeout310(() => this.level.enemies = this.level.enemies.filter(e => !this.enemiesToRemove.includes(e)));
    }

    removeBottles(bottle) {
        bottle.enemyTouche();
        bottle.speed = 0;

        setPushToArrayTimeout300(() => this.bottlesToRemove.push(bottle));
        setRemoveFromArraryTimeout310(() => this.throwableObjects = this.throwableObjects.filter(b => !this.bottlesToRemove.includes(b)));
    }
 
}