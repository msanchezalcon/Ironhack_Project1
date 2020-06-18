class Bullets {
    constructor(ctx, heroPosX, heroPosY, heroW, heroH) {
        this.ctx = ctx
        this.posX = heroPosX + heroW
        this.posY = heroPosY + heroH / 2
        this.radius = 5
        this.speedX = 100
        this.speedY = 1
        this.gravity = 1
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'grey'
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
    }


    move() {
        this.posX += this.speedX
    }
}