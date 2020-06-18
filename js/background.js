class Background {

    constructor(ctx, backgX, backgY) {
        this.ctx = ctx
        this.backgWidth = 900
        this.backgHeight = 500
        this.image = new Image()
        this.image.src = `./img/bg.png`

        this.backgX = backgX
        this.backgY = backgY

    }

    draw() {
        this.ctx.drawImage(this.image, this.backgX, this.backgY, this.backgWidth, this.backgHeight)
    }
}