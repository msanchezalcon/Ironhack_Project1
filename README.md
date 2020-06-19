
# Ironhack Project 1
FINDING JACK
Videogame with HTML and Canvas 10x10.

# Objetivo
Salir del laberinto sorteando obstáculos aleatorios y enemigo que se mueve aleatoriamente, para conseguir la llave.


# Grid
Grid 10x10, 15x15 o 20x20. Zonas de paso y no paso con obstáculos aleatorios.
Ejemplo online : https://juegoscanvas.blogspot.com/2013/03/tile-mapping.html
Paredes y enemigos : https://juegoscanvas.blogspot.com/2014/05/paredes-y-enemigos.html
Ejemplo : https://html5.litten.com/make-a-maze-game-on-an-html5-canvas/
http://jsfiddle.net/hW4uV/33/


let grid = [
    [0, 0, 0], <= // [0, 1, 2]
    [0, 1, 0], <= // [0, 1, 2]
    [0, 0, 0]  <= // [0, 1, 2]
] 

# Obstáculos
Se moverán de forma aleatoria por el tablero. La forma de poner los obstáculos serán 1.

=> Si obstáculos determinan la forma del laberinto:
    - 1ª la grid todo 0
    - 2º Random determina la posición de la grid para cambiar 0 por 1
    - 3ª Mutará la grid para cambiar 0 a 1


=> Si obstáculos están dentro de las zonas de paso:
    - 1ª la grid inicial 0 y 1
    - 2º Random determina la posición de la grid
    - 3ª Comprobará que la posición elegida contiene un 0 de valor. En caso de que si mutará a 1. En caso de que no segirá buscando
    - 4ª Pondrá el obstáculo siempre que el valor inicial sea 0 en la grid
    
# Paisano
Paisano se mueve:
    => up/down, teclas keyCode: 40 up, 38 down
    => lef/right teclas keyCode: 39 right, 37 left
    => y dispara con barra espaciadora.tecla 32

Si encuentra obstáculo no puede pasar debe buscar la forma de salir.
Si el paisano va a zona 0 puede moverse, si se dirige a zona 1 no puede ir.
Habría que comprobar la siguiente dirección si va a zona 0 o 1.


# Enemigo
Enemigo al que habrá que disparar para llegar a la meta (si toca al paisano, paisano muere).
Solo se podrá mover por zona 0 de forma aleatoria.

# Meta
Habrá una llave al salir del laberinto que habrá que coger para ganar el juego.
