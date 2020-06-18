const Game = {
    name: "Canvas App",
    description: "Finding Jack",
    version: "1.0.0",
    author: "Eva y Míriam",
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    canvasSize: {
        w: 900,
        h: 500
    },
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
    keys: {
        UP: 38,
        LEFT: 37,
        RIGHT: 39,
        SPACE: 32,
        DOWN: 40
    },

    init() {
        this.canvasDom = document.getElementById("board")
        this.ctx = this.canvasDom.getContext("2d")
        this.canvasDom.setAttribute("width", this.canvasSize.w)
        this.canvasDom.setAttribute("height", this.canvasSize.h)
        this.generatorObstacles()
        this.start()
    },


    start() {
        this.reset()
        this.setListeners()

        this.interval = setInterval(() => {
            this.clear()
            this.drawAll()
            this.generatorMonster()
            //   console.log(this.isCollisionWithMonster())


            if (this.touchesMonster(this.hero)) {
                console.log("WINNNNNN")
                // this.gameOver()                                    descomentar luego  !!!!!! <<<<<<<<<<<<<<<
            }

            // if (this.checkCol == true) {
            //     return this.gameOver()
            //     console.log('player dead')
            // } else {
            //     console.log('you are still alive')
            // }

            if (this.isCollisionWithJack()) {
                return this.winGame()
            }

            if (this.isCollisionWithBullets()) {
                console.log("monster dead")
            }

        }, 1000)
    },

    reset() {
        this.hero = new Hero(
            this.ctx,
            this.canvasSize.w / 2 - 450,
            this.canvasSize.h / 2 - 250
        )
        this.background = new Background(
            this.ctx,
            this.canvasSize.w / 2 - 450,
            this.canvasSize.h / 2 - 250
        )

        this.treasure = new Treasure(
            this.ctx,
            this.canvasSize.w / 2 + 450 - 65,
            this.canvasSize.h / 2 + 250 - 70
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
            this.obstacles = new Obstacle(this.ctx, this.canvasSize.w / 2 - 450, this.canvasSize.h / 2 - 250, this.canvasSize.w, this.canvasSize.h)
            this.generalObstacle.push(this.obstacles)
        }
        //console.log(this.generalObstacle)
    },

    generatorMonster() {
        this.monsterRandom.push(new Monster(this.ctx, this.canvasSize.w / 2 - 450, this.canvasSize.h / 2 - 250, this.canvasSize.w, this.canvasSize.h))
        console.log(this.monsterRandom)
    },

    clearMonster() {
        this.monsterRandom = this.monsterRandom.filter(b => b.posX >= this.canvasSize.w)
        console.log(this.monsterRandom)
    },



    touchesWalls(hero) {
        return this.generalObstacle.some(obs => this.overlap(hero, obs))
    },

    touchesMonster(hero) {
        console.log(this.monsterRandom)
        return this.monsterRandom.some(monster => this.isCollisionWithMonster(hero, monster))
    },

    overlap(hero, wall) {
        //console.log(“VALORES”, hero.posX, hero.posY, hero.width, hero.height, wall.obstX, wall.obstY, wall.obstW, wall.obstH)
        if (hero.posX + hero.width > wall.obstX &&
            hero.posX < wall.obstX + wall.obstW &&
            hero.posY + hero.height > wall.obstY &&
            hero.posY < wall.obstY + wall.obstH) {
            return true;
        }
        return false;
    },

    moveDirection(dir) {
        dir === 'left' ? this.hero.posX -= this.hero.speed : null
        dir === 'right' ? this.hero.posX += this.hero.speed : null
        dir === 'up' ? this.hero.posY -= this.hero.speed : null
        dir === 'down' ? this.hero.posY += this.hero.speed : null
    },

    setListeners() {
        document.onkeydown = e => {
            let trackPosX = this.hero.posX
            let trackPosY = this.hero.posY
            let trackSpeed = this.hero.speed
            switch (e.keyCode) {
                case this.keys.LEFT:
                    trackPosX -= trackSpeed
                    if (!this.touchesWalls({
                            ...this.hero,
                            posX: trackPosX
                        })) {
                        this.moveDirection("left")
                    }
                    break;
                case this.keys.RIGHT:
                    trackPosX += trackSpeed
                    if (!this.touchesWalls({
                            ...this.hero,
                            posX: trackPosX
                        })) {
                        this.moveDirection("right")
                    }
                    break;
                case this.keys.UP:
                    trackPosY -= trackSpeed
                    if (!this.touchesWalls({
                            ...this.hero,
                            posY: trackPosY
                        })) {
                        this.moveDirection("up")
                    }
                    break;
                case this.keys.DOWN:
                    trackPosY += trackSpeed
                    if (!this.touchesWalls({
                            ...this.hero,
                            posY: trackPosY
                        })) {
                        this.moveDirection("down")
                    }
                    break;
                case this.keys.SPACE:
                    this.hero.shoot(this.audio.bullets)
                    break;
            }
        }
    },




    // isCollisionWithMonster() {

    //     this.monsterRandom.some(mons => {
    //         console.log(mons.posX, mons.posY, mons.width, mons.height)
    //         console.log(this.hero.posX, this.hero.posY, this.hero.width, this.hero.height)
    //         if (
    //             this.hero.posX + this.hero.width >= mons.c &&
    //             this.hero.posY + this.hero.height >= mons.posY &&
    //             this.hero.posX <= mons.posX + mons.width
    //         ) {
    //             return this.checkCol = true

    //         } else {
    //             console.log('----------------- colisión monster else')
    //         }
    //     })
    // },


    isCollisionWithMonster(hero, mos) {
        if (hero.posX + hero.width > mos.posX &&
            hero.posX < mos.posX + mos.width &&
            hero.posY + hero.height > mos.posY &&
            hero.posY < mos.posY + mos.height) {
            return true;
        }
        return false
    },

    isCollisionWithBullets() {
        this.monsterRandom.some(mons => {
            if (
                mons.posX + mons.width >= this.hero.bullets.posX &&
                mons.posY + mons.height >= this.hero.bullets.posY &&
                mons.posX <= this.hero.bullets.posX + this.hero.width &&
                mons.posY < this.hero.bullets.posY + this.hero.height
            ) {
                console.log('we shot monster!')
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
            console.log('we got JACK!')
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