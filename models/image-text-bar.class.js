class  ImageTextBar extends DrawableObject{
 
    text = 0;
    radius = 22;

    circleX = 0;
    circleY = 0;

    textX1 = 0; // one digit
    textX2 = 0; // two digits
    textY = 0;


    constructor(x, y, w, h, path) {
        super()
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.loadImage(path);
    }


    draw(ctx) {
        try {
            ctx.save();
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            this.drawCirle(ctx);
            this.drawText(ctx);
            ctx.restore();
        } catch (e) {
            console.warn("Error loading image", e);
            console.log("Current Obj:", this);
            console.log("Could not load image:", this.img.src);
        }
    }

    drawCirle(ctx) {
        ctx.beginPath();
        ctx.arc(this.circleX , this.circleY, this.radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    drawText(ctx) {
        let textX = this.textX2;
        let textString = this.text.toString();
        if (this.text.toString().length == 1) {
            textX = this.textX1;
        } 
        ctx.font = '20pt Calibri';
        ctx.fillText(textString, textX, this.textY);
    }

    
}