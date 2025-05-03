class ImageTextBarCoin extends ImageTextBar{

    offset = {
        left: 70,
        right: 70,
        top: 70,
        bottom: 70
    }

    constructor(x, y, w, h, path) {
        super(x, y, w, h, path);
        //ctx.arc(this.x + 100 , this.y + 54, this.radius, 0, 2 * Math.PI, false);
        this.circleX = this.x + 100;
        this.circleY = this.y + 54;

        this.textX1 = this.x + 94;
        this.textX2 = this.x + 88;
        this.textY = this.y + 63;
    }
}