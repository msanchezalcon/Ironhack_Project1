class Bullets {
    constructor(ctx, heroPosX, heroPosY, heroW, heroH,  playerPosY0) {
        this.ctx = ctx
        this.posX = heroPosX + heroW
        this.posY = heroPosY + heroH / 2
        this.playerPosY0 = playerPosY0;
        this.playerHeight = heroH

        this.radius = 10
        this.speedX = 10
        this.speedY = 0;

    
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'black'
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.move()
    }


    move() {
        this.posX += this.speedX
        this.posY += this.speedY
    }
}