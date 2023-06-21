var juego=new Phaser.Game(370,550, Phaser.CANVAS, 'bloque_juego');
var fondoJuego;
var boton;
var flappy;
var teclaDerecha;
var teclaIzquierda;
var teclaArriba;
var teclaAbajo;

var estadoPrincipal={

	preload: function(){
		juego.load.image('fondo','img/bg.jpg');
		//juego.load.image('pajaro','img/pajaro1.png');
		juego.load.spritesheet('pajaros','img/sonic.png',43,30);
		//juego.load.image('btn','img/btn.png');
	},

	create: function(){
		fondoJuego=juego.add.tileSprite(0,0,370,550,'fondo');
		flappy=juego.add.sprite(100,100,'pajaros');
		flappy.frame=1;
		flappy.animations.add('vuelo',[0,1,2],10,true);
		var estiloTexto = { font: "20px Arial", fill: "#ffff" };
		var nombre = juego.add.text(juego.width/2, juego.height-30, "DIEGO ALONSO MIÑANO LAVADO", estiloTexto);
		nombre.anchor.setTo(0.5);
		//flappy=juego.add.sprite(juego.width/2,juego.height/2,'pajaro');
		//boton=juego.add.sprite(juego.width/2,juego.height/2,'btn');
		//boton.anchor.setTo(0.5,0.5);
		//flappy.anchor.setTo(0.5);
		//flappy.scale.setTo(-1,1);
		//teclas del juego:
				teclaDerecha=juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
				teclaIzquierda=juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
				teclaArriba=juego.input.keyboard.addKey(Phaser.Keyboard.UP);
				teclaAbajo=juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);

	},
	update: function(){
		fondoJuego.tilePosition.x-=1;
		//flappy.angle+=0.2;
		flappy.animations.play('vuelo');

		if(teclaDerecha.isDown){
			flappy.x++;
		}
		else if (teclaIzquierda.isDown){
			flappy.x--;
		}
		else if (teclaArriba.isDown){
			flappy.y--;
		} else if (teclaAbajo.isDown){
			flappy.y++;
		}
	}
};

//asignamos el estado que acaba de crear al juego
juego.state.add('principal', estadoPrincipal);
//iniciar el juego desde el estado principal por defecto
juego.state.start('principal');