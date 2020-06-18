class Obstacle {
    constructor(ctx, obstX, obstY, obstCanvasW, obstCanvasY) {
        this.ctx = ctx
        this.obstX = Math.round((Math.random() * ((450 * 2) + obstX) + obstX) / 50) * 50
        this.obstY = Math.round((Math.random() * ((250 * 2) + obstY) + obstY) / 50) * 50
        this.obstW = 50
        this.obstH = 50
        this.obstCanvasW = obstCanvasW
        this.obstCanvasY = obstCanvasY
        //this.obstH = Math.round((Math.random() * ((680 - this.obstY) - 30) + 30) / 10) * 10
    }


    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.obstX, this.obstY, this.obstW, this.obstH)

    }
}

// vamos a definir la posicion random aqui, y se pinta el resultado en la app.