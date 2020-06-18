class Treasure {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = 60
        this.height = 75
        this.image = new Image()
        this.image.src = `./img/jack.png`
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height
        )
    }
}