class BackgroundObject extends MovableObject {
    w = 720;
    h = 480;
    
    constructor(path, x) {
        super().loadImage(path);
        this.y = 480 - this.h;
        this.x = x;
    }
}