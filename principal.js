var juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloque_juego');
var fondoJuego;
var flappy;
var teclaArriba;

var tubos;
var espacioEntreTubos = 200;
var timerTubos;
var gameOverText;
var playerNameText;

var estadoPrincipal = {
    preload: function () {
        juego.load.image('fondo', 'img/bg.jpg');
        juego.load.spritesheet('pajaros', 'img/pajaro.png', 43, 30);
        juego.load.image('tubo_arriba', 'img/tubo_arriba.png');
        juego.load.image('tubo_abajo', 'img/tubo_abajo.png');
    },
    create: function () {
        fondoJuego = juego.add.tileSprite(0, 0, 370, 550, 'fondo');
        flappy = juego.add.sprite(100, 100, 'pajaros');
        flappy.frame = 1;
        flappy.animations.add('vuelo', [0, 1, 2], 10, true);

        juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.physics.arcade.enable(flappy);
        flappy.body.gravity.y = 1000;


        tubos = juego.add.group();
        timerTubos = juego.time.events.loop(1500, this.crearTubos, this);


        var estiloTexto = { font: "20px Arial", fill: "#ffff" };
        gameOverText = juego.add.text(juego.width / 2, juego.height / 2, "GAME OVER", estiloTexto);
        gameOverText.anchor.setTo(0.5);
        gameOverText.visible = false;


        playerNameText = juego.add.text(juego.width / 2, juego.height - 20, "Diego Alonso Miñano Lavado", estiloTexto);
        playerNameText.anchor.setTo(0.5);


        teclaArriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaArriba.onDown.add(this.saltar, this);
    },
    update: function () {
        fondoJuego.tilePosition.x -= 1;
        flappy.animations.play('vuelo');


        juego.physics.arcade.overlap(flappy, tubos, this.gameOver, null, this);

        if (flappy.y > juego.height || flappy.y < 0) {
            this.gameOver();
        }
    },
    saltar: function () {

        flappy.body.velocity.y = -350;
    },
    crearTubos: function () {

        var hueco = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < 8; i++) {
            if (i !== hueco && i !== hueco + 1) {
                this.crearUnTubo(370, i * 55 + 20);
            }
        }
    },
    crearUnTubo: function (x, y) {

        var tubo_arriba = juego.add.sprite(x, y, 'tubo_arriba');
        tubos.add(tubo_arriba);
        juego.physics.arcade.enable(tubo_arriba);
        tubo_arriba.body.velocity.x = -150;

    },
    gameOver: function () {

        tubos.forEach(function (tubo) {
            tubo.body.velocity.x = 0;
        }, this);

        gameOverText.visible = true;


        juego.time.events.add(Phaser.Timer.SECOND * 2, this.restartGame, this);
    },
    restartGame: function () {

        tubos.removeAll();
        flappy.y = 100;
        flappy.body.velocity.y = 0;
        gameOverText.visible = false;
        timerTubos.timer.start();
    }
};


juego.state.add('principal', estadoPrincipal);

juego.state.start('principal');
