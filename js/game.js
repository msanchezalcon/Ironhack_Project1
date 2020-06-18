const Game = {
    name: "Canvas App",
    description: "Finding Jack",
    version: "1.0.0",
    author: "Eva y Míriam",
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    // canvasSizeW: undefined,
    // canvasSizeH: undefined,
    canvasSizeW
    background: undefined,
    hero: undefined,
    monster: undefined,
    treasure: undefined,
    bullets: undefined,
    generalObstacle: [],
    monsterRandom: [],
    audio: {
        treasure: new Audio("./audio/whistle.mp3"),
        hero: new Audio("./audio/baby.mp3"),
        bullets: new Audio("./audio/gun.mp3"),
        monster: new Audio("./audio/monster.mp3")
    },
    obstacles: undefined,
    checkCol: undefined,
    interval: undefined,

    init() {
        console.log("estoy leyendo el init de game.js")
        this.canvasDom = document.getElementById("board")
        this.ctx = this.canvasDom.getContext("2d")
        this.canvasDom.setAttribute("width", this.canvasSize.w)
        this.canvasDom.setAttribute("height", this.canvasSize.h)
        this.setDimensions()
        this.generatorObstacles()
        this.start()
    },

    setDimensions() {
        this.canvasSizeW = 900
        this.canvasSizeH = 500
        this.canvasDom.width = this.width
        this.canvasDom.height = this.height
    },

    start() {
        this.reset()

        this.interval = setInterval(() => {
            this.clear()
            this.drawAll()
            this.moveHero()
            this.generatorMonster()
            //    this.isCollisionWithMonster() ? console.log('player dead') : null
            this.isCollisionWithJack() ? this.winGame() : null
            this.isCollisionWithBullets() ? console.log("monster dead") : null
        }, 1000)
    },

    reset() {
        this.hero = new Hero(
            this.ctx,
            this.canvasSizeW / 2 - 450,
            this.canvasSizeH / 2 - 250,
            this.posX,
            this.posY,
            this.canvasSizeW
        )
        this.background = new Background(
            this.ctx,
            this.canvasSizeW / 2 - 450,
            this.canvasSizeH / 2 - 250
        )

        this.treasure = new Treasure(
            this.ctx,
            this.canvasSizeW / 2 + 450 - 65,
            this.canvasSizeH / 2 + 250 - 70
        )
    },

    drawAll() {
        this.background.draw()
        this.generalObstacle.forEach((obs) => obs.draw())
        this.hero.draw()
        this.monsterRandom.forEach((m) => m.draw())
        // this.clearMonster()
        this.treasure.draw()
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    generatorObstacles() {
        for (let i; this.generalObstacle.length < 40; i++) {
            this.obstacles = new Obstacle(this.ctx, this.canvasSizeW / 2 - 450, this.canvasSizeH / 2 - 250, this.canvasSize., this.canvasSize.h)
            this.generalObstacle.push(this.obstacles)
        }
        //console.log(this.generalObstacle)
    },

    generatorMonster() {
        this.monsterRandom.push(new Monster(this.ctx, this.canvasSize.w, this.canvasSize.h, this.canvasSize.w, this.canvasSize.h))
        console.log(this.monsterRandom)
    },

    clearMonster() {
        this.monsterRandom = this.monsterRandom.filter(b => b.posX >= this.canvasSize.w)
        console.log(this.monsterRandom)
    },

    moveHero() {
        document.onkeydown = e => {
            if (e.keyCode === 37) {
                this.move('left')
            } else if (e.keyCode === 39) {
                this.move('right')
            } else if (e.keyCode === 38) {
                this.move('up')
            } else if (e.keyCode === 40) {
                this.move('down')
            } else if (e.keyCode === 32) {
                this.hero.shoot(this.audio.bullets)
            } else {
                return null
            }
        }
    },

    checkObsBr() {
        this.checkCol = false
        let posXheroW = this.hero.posX + this.hero.width
        let posYheroH = this.hero.posY + this.hero.height

        //BR check Position X and Position BR
        this.generalObstacle.some(obs => {

            if (posXheroW >= obs.obstX &&
                posXheroW <= (obs.obstX + obs.obstW) &&
                posYheroH >= obs.obstY &&
                posYheroH <= (obs.obstY + obs.obstH)) {
                //  this.hero.speed = 0
                console.log('BR está en al zona X e Y ¡CHOCA!')
                return this.checkCol = true
            }
        })
    },


    checkObsBl() {
        this.checkCol = false
        let posYheroH = this.hero.posY + this.hero.height

        // BL check Positio X and Y Position BL
        this.generalObstacle.some(obs => {

            if (this.hero.posX <= (obs.obstX + obs.obstW) &&
                this.hero.posX >= obs.obstX &&
                posYheroH <= obs.obstY &&
                posYheroH >= (obs.obstY + obs.obstH)) {
                //this.hero.speed = 0
                console.log('BL en al zona X e Y ¡CHOCA!')
                return this.checkCol = true
            }
        })

    },

    checkObsTr() {
        this.checkCol = false
        let posXheroW = this.hero.posX + this.hero.width

        // TR check Positio X and Y Position BL
        this.generalObstacle.some(obs => {

            if (posXheroW >= obs.obstX &&
                posXheroW <= (obs.obstX + obs.obstW) &&
                this.hero.posY <= (obs.obstY + obs.obstH) &&
                this.hero.posY >= obs.obstY) {
                // this.hero.speed = 0
                console.log('TR en al zona X e Y ¡CHOCA!')
                return this.checkCol = true

            }
        })

    },

    checkObsTl() {
        this.checkCol = false

        //TL check Positio X and Y Position BL
        this.generalObstacle.some(obs => {

            if (this.hero.posX <= (obs.obstX + obs.obstW) &&
                this.hero.posX >= obs.obstX &&
                this.hero.posY <= (obs.obstY + obs.obstH) &&
                this.hero.posY >= obs.obstY) {
                // this.hero.speed = 0
                console.log('TL en al zona X e Y ¡CHOCA!')
                return this.checkCol = true
            }
        })
    },

    isCollisionWithMonster() {

        this.monsterRandom.some(mons => {
            console.log('----------------- colisión monster')
            console.log(mons.posX, mons.posY, mons.width, mons.height)
            console.log(this.hero.posX, this.hero.posY, this.hero.width, this.hero.height)
            console.log('----------------- colisión monster')
            if (
                this.hero.posX + this.hero.width >= mons.posX &&
                this.hero.posY + this.hero.height >= mons.posY &&
                this.hero.posX <= mons.posX + mons.width
            ) {
                return true

            } else {
                console.log('----------------- colisión monster')
            }
        })
    },


    move(dir) {

        let trackPosX = this.hero.posX
        let trackPosY = this.hero.posY
        let trackSpeed = this.hero.speed

        switch (dir) {
            case 'left':
                this.isCollisionWithMonster()
                trackPosX -= this.trackSpeed
                this.checkObsTl()
                if (this.checkCol === true) {
                    console.log('estoy en true')
                    trackSpeed = 0
                } else {
                    this.checkObsBl()
                    if (this.checkCol === true) {
                        console.log('estoy en true')
                        trackSpeed = 0
                    } else {
                        this.hero.posX -= this.hero.speed
                    }
                }
                break;

            case 'right':
                this.isCollisionWithMonster()
                trackPosX += this.trackSpeed
                this.checkObsTr()
                if (this.checkCol === true) {
                    console.log('estoy en true')
                    trackSpeed = 0
                } else {
                    this.checkObsBr()
                    if (this.checkCol === true) {
                        console.log('estoy en true')
                        trackSpeed = 0
                    } else {
                        this.hero.posX += this.hero.speed
                    }
                }
                break;

            case 'up':
                this.isCollisionWithMonster()
                this.checkObsTr()
                if (this.checkCol === true) {
                    console.log('estoy en true')
                    trackSpeed = 0
                } else {
                    this.checkObsTl()
                    if (this.checkCol === true) {
                        console.log('estoy en true')
                        trackSpeed = 0
                    } else {
                        this.hero.posY -= this.hero.speed
                    }
                }
                break;

            case 'down':
                this.isCollisionWithMonster()
                trackPosY += this.trackSpeed
                this.checkObsBr()
                if (this.checkCol === true) {
                    console.log('estoy en true')
                    trackSpeed = 0
                } else {
                    this.checkObsBl()
                    if (this.checkCol === true) {
                        console.log('estoy en true')
                        trackSpeed = 0
                    } else {
                        this.hero.posY += this.hero.speed
                    }
                }
                break;

            default:
                return null
                break;
        }
    },

    // isCollisionWithMonster() {
    //     this.monsterRandom.some(mons => {
    //         if (
    //             this.hero.posX + this.hero.width >= mons.posX &&
    //             this.hero.posY + this.hero.height >= mons.posY &&
    //             this.hero.posX <= mons.posX + mons.width
    //         ) {
    //             return true
    //             console.log('hola')

    //         }
    //     })
    // },

    isCollisionWithBullets() {
        this.monsterRandom.some(mons => {
            if (
                mons.posX + mons.width >= this.hero.bullets.posX &&
                mons.posY + mons.height >= this.hero.bullets.posY &&
                mons.posX <= this.hero.bullets.posX + this.hero.bullets.width
            ) {
                console.log('¡balazo al bicho!')
                console.log(this.monsterRandom)
                this.audio.monster.play()
                this.audio.monster.volume = 0.2
                this.audio.monster.duration = 1
                this.monsterRandom.splice(mons)
                clearInterval(this.interval)
            }
        })
    },

    isCollisionWithJack() {
        if (
            this.hero.posX + this.hero.width >= this.treasure.posX &&
            this.hero.posY + this.hero.height >= this.treasure.posY &&
            this.hero.posX <= this.treasure.posX + this.treasure.width
        ) {
            console.log('colisiona jack!!!!')
            return true
        }
    },

    gameOver() {
        document.querySelector('.over').classList.add('view')
        console.log('game over')
        this.audio.hero.play()
        this.audio.hero.volume = 0.2
        this.audio.hero.duration = 1
        clearInterval(this.interval)
    },

    winGame() {
        console.log('win game')
        this.audio.treasure.play()
        this.audio.treasure.volume = 0.2
        this.audio.treasure.duration = 0.2
        document.querySelector('.win').classList.add('view')
        clearInterval(this.interval)
    }
}