class Collectable extends CoolidableObject {
    intervalIDs = [];

    constructor(){
        super();
    }

    destroySelf() {
        this.intervalIDs.forEach(clearInterval);
    }
}