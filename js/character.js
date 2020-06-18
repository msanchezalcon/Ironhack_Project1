class Hero {
  constructor(ctx, posX, posY) {
    this.posX = Math.round(posX)
    this.posY = Math.round(posY)
    this.width = 40
    this.height = 50
    this.image = new Image()
    this.image.src = `./img/heroine.png`
    this.speed = Math.round(50)
    this.ctx = ctx
    this.bullets = []
    this.soundShoot = false
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    )

    this.bullets.forEach((b) => b.draw())
    this.clearBullets()
  }

  shoot(audioShoot) {
    console.log('is shooting!')
    this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.width, this.height))
    // this.audioShoot = true
    audioShoot.play()
    audioShoot.volume = 0.2
    // audioShoot.duration = 1
  }

  clearBullets() {
    console.log('clearing bullets!')
    this.bullets = this.bullets.filter(b => b.posX + 10)
  }
}



class Monster {
  constructor(ctx, posX, posY, obstCanvasW, obstCanvasY) {
    this.posX = Math.round(Math.round(posX))
    this.posY = Math.round(Math.round(posY))
    this.width = 50
    this.height = 50
    this.image = new Image()
    this.image.src = `./img/virus.png`
    this.speedX = 50
    this.speedY = 150
    this.ctx = ctx
    this.obstCanvasW = obstCanvasW
    this.obstCanvasY = obstCanvasY
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    )
    this.moveMonster()
  }

  moveMonsterX() {
    this.posX += this.speedX
    this.posY += this.speedY
  }
  moveMonsterY() {
    this.posX -= this.speedX
    this.posY -= this.speedY
  }

  moveMonster() {
    this.moveMonsterX()
    this.moveMonsterY()
  }

}