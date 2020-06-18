class Hero {
  constructor(ctx, posX, posY) {
    this.posX = posX //Math.round(posX)
    this.posY = posY //Math.round(posY)
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
    console.log('-1----------', this.bullets)
    this.clearBullets()
    console.log('---2--------', this.bullets)
  }

  shoot(audioShoot) {
    console.log('is shooting!')

    this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.width, this.height))
    console.log('------3-----', this.bullets)
    // this.audioShoot = true
    audioShoot.play()
    audioShoot.volume = 0.2
    // audioShoot.duration = 1
  }

  clearBullets() {
    this.bullets = this.bullets.filter(b => b.posX + 10)
    console.log('----5-------', this.bullets)

  }
}



class Monster {
  constructor(ctx, posX, posY, monsterCanvasW, monsterCanvasY) {
    this.posX = Math.round((Math.random() * ((450 * 2) + posX) + posX) / 50) * 50
    this.posY = Math.round((Math.random() * ((250 * 2) + posY) + posY) / 50) * 50
    this.width = 50
    this.height = 50
    this.image = new Image()
    this.image.src = `./img/virus.png`
    this.speedX = 50
    this.speedY = 150
    this.ctx = ctx
    this.monsterCanvasW = monsterCanvasW
    this.monsterCanvasY = monsterCanvasY
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