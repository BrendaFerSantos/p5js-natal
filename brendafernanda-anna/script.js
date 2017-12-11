/**
 * p5js boilerplate
 * 
 * 
 */

var neve;//Declara as variaveis
var boneco;
var cadente = null;
var pinheiro;
var rosaClaro;
var rosa;
var lilas;
var vermelho;
var estrelinha;

var floco_1,
	pos_rosaClaro,
	pos_rosa,
	pos_lilas,
	pos_vermelho;

var musica;

var x, y;

var pos_mouse_anterior = 0;
var pos_mouse_atual = 0;

var lista_flocos = [];

//Carrega arquivos externos para dentro do codigo
function preload() {
	neve = loadImage('ceu.jpg');//Carrega a imagem de fundo
	boneco = loadImage('bonecodeneve.png');//Carrega a imagem do boneco de neve
	cadente = loadImage('estrela.png');//Carrega a imagem da estrela
	pinheiro = loadImage('pinheiro.png');//Carrega a imagem da arvore
	rosaClaro = loadImage('floco1.png');//Carrega a imagem do floco 1
	estrelinha = loadImage("estrelinha.png");
	rosa = loadImage('floco2.png');//Carrega a imagem do floco 2
	lilas = loadImage('floco3.png');//Carreg a imagem do floco 3
	vermelho = loadImage('floco4.png');//Carrega a imagem do floco 4
	soundFormats('mp3');//Define o formato do som
	musica = loadSound('musica.mp3');//Carrega a musica que vai tocar
}

// chamada no inicio do programa
function setup() {
	// cria o quadro, com dimensoes 900 x 400
	createCanvas(1335, 620);

	x = 40;//Posicao do x da estrela
	y = 10;//Posicao do y da estrela
	
	//Cria o vetor
	//Escreve as coordenadas para desenhar o floco
	pos_rosaCalaro = createVector(325, 125);
	// floco_1 = new FlocoUm(325, 125, 55, -1); // -1 gera um erro
	floco_1 = new FlocoUm(425, 85, 55, 3, random(1, 3));//Posicao x e y, tamanho e velocidade em que o floco vai girar 
	outroFlocoUm = new FlocoUm(135, 35, 85, 8, random(1, 3));//Desenha outro floco; posicao x e y, tamanho e velocidade 
	
	pos_rosa = createVector(525, 135);
	flocoDois = new FlocoDois(65, 90, 50, 9, random(1, 3));//Posicao x e y, tamanho e velocidade 
	outroFlocoDois = new FlocoDois(495, 50, 80, 2, random(1, 3));//Desenha outro floco; posicao x e y, tamanho e velocidade
	
	pos_lilas = createVector(435, 145);
	flocoTres = new FlocoTres(600, 95, 35, 5, random(1, 3));
	outroFlocoTres = new FlocoTres(330, 55, 65, 7, random(1, 3));
	
	pos_vermelho = createVector(675, 155);
	flocoQuatro = new FlocoQuatro(245, 85, 45, 4, random(1, 3));
	outroFlocoQuatro = new FlocoQuatro(680, 55, 75, 6, random(1, 3));

	musica.setVolume(1.0);//Define o volume da musica
	musica.loop();//Faz a musica repitir, quando terminar

	var floco;
	for(var i = 0; i < 100; i++) {
		if (i % 4 == 0) floco = new FlocoUm(random(0, width), random(0, height), random(20, 80), random(0, 10), random(1, 3));
		if (i % 4 == 1) floco = new FlocoDois(random(0, width), random(0, height), random(20, 80), random(0, 10), random(1, 3));
		if (i % 4 == 2) floco = new FlocoTres(random(0, width), random(0, height), random(20, 80), random(0, 10), random(1, 3));
		if (i % 4 == 3) floco = new FlocoQuatro(random(0, width), random(0, height), random(20, 80), random(0, 10), random(1, 3));
		lista_flocos.push(floco);
	}
}

// chamada toda vez que o quadro for redesenhado
// ou seja, a cada frame da animacao
function draw() {
	pos_mouse_atual = mouseX;

	if (pos_mouse_atual > pos_mouse_anterior) velocidade_vento = 1;
	else if (pos_mouse_atual == pos_mouse_anterior) velocidade_vento = 0;
	else velocidade_vento = -1;

	// pinta o fundo de preto
	background(neve);//Coloca a imagem de fundo

	//Desenha as imagens, do boneco do pinheiro e da estrela e as posicoes x e y e o tamanho
	image(boneco, 200, 440, 150, 150);

	image(cadente, x, y, 100, 100);

	x = x + 8;
	//Velocidade 
	y = y + 2;

	//Faz a estrela ficar repetindo
	if (x < 0) {
		x = height;
	}

	image(pinheiro, 1000, 277, 300, 320);
	image(estrelinha, 1130, 265, 50, 50);

	//Declara a funcao para desenhar os flocos
	floco_1.desenha();
	floco_1.mover(velocidade_vento);
	outroFlocoUm.desenha();
	outroFlocoUm.mover(velocidade_vento);

	flocoDois.desenha();//image(rosa, pos_rosa.x, pos_rosa.y, 50,50);
	flocoDois.mover(velocidade_vento);
	outroFlocoDois.desenha();
	outroFlocoDois.mover(velocidade_vento);

	flocoTres.desenha();//image(lilas, pos_lilas.x, pos_lilas.y, 35,35);
	flocoTres.mover(velocidade_vento);
	outroFlocoTres.desenha();
	outroFlocoTres.mover(velocidade_vento);

	flocoQuatro.desenha();//image(vermelho, pos_vermelho.x, pos_vermelho.y, 45,45);
	flocoQuatro.mover(velocidade_vento);
	outroFlocoQuatro.desenha();
	outroFlocoQuatro.mover(velocidade_vento);

	if (frameCount % 60 == 0) pos_mouse_anterior = mouseX;

	for(var i = 0; i < lista_flocos.length; i++) {
		lista_flocos[i].desenha();
		lista_flocos[i].mover(velocidade_vento);
	}

}

//Cria a funcao para desenhar o floco  
//usa as variaveis com a posicao, tamanho e velocidade do giro, que ja estao armazenadas 
function FlocoUm(x, y, tamanho, velocidade_giro, velocidade_queda) {
	if (velocidade_giro < 0 || velocidade_giro > 10) throw "velocidade_giro deve estar entre 0 e 10";//Envia um erro em relacao a velocidade do giro
	this.pos = createVector(x, y);//Determina a posicao do floco
	this.angulo = 0;//Determina o angulo em que o floco vai girar
	this.tamanho = tamanho;//Determina o tamanho do floco
	this.velocidade_giro = velocidade_giro;//Determina a velocidade com que o floco vai girar
	this.velocidade_queda = velocidade_queda;
	return this;//Retorna o floco, com a posicao, angulo, tamanho e velocidade do giro	
}

//Cria a classe para desenhar o floco
FlocoUm.prototype.desenha = function () {
	push();//Inicia a transformacao
	translate(this.pos.x + this.tamanho / 2, this.pos.y + this.tamanho / 2);//Muda o eixo do floco em relacao a posicao e ao tamanho 
	rotate(this.angulo);//Define o giro do floco em relacao ao angulo
	image(rosaClaro, -this.tamanho / 2, -this.tamanho / 2, this.tamanho, this.tamanho);//Desenha e define o local em que o floco vai estar
	this.angulo += 0.01 * this.velocidade_giro/5;//Faz o floco girar
	pop();//Descarta as alteracoes feitas anteriormente pela transformacao
}

//Cria a classe para desenhar o floco
FlocoUm.prototype.mover = function (velocidade_vento) {
	this.pos.y += this.velocidade_queda;
	if (this.pos.y > height) this.pos.y = -this.tamanho;
	this.pos.x += velocidade_vento;
	if (this.pos.x > width + this.tamanho) this.pos.x = -this.tamanho;
	if (this.pos.x < -this.tamanho) this.pos.x = width + this.tamanho;
}

function FlocoDois(x, y, tamanho, velocidade_giro, velocidade_queda) {
	this.pos = createVector(x, y);
	this.angulo = 0;
	this.tamanho = tamanho;
	this.velocidade_giro = velocidade_giro;
	this.velocidade_queda = velocidade_queda;
	return this;
}

FlocoDois.prototype.desenha = function () {
	push();
	translate(this.pos.x + this.tamanho / 2, this.pos.y + this.tamanho / 2);
	rotate(this.angulo);
	image(rosa, -this.tamanho / 2, -this.tamanho / 2, this.tamanho, this.tamanho);
	this.angulo += 0.01 * this.velocidade_giro/5;
	pop();
}

FlocoDois.prototype.mover = function (velocidade_vento) {
	this.pos.y += this.velocidade_queda;
	if (this.pos.y > height) this.pos.y = -this.tamanho;
	this.pos.x += velocidade_vento;
	if (this.pos.x > width + this.tamanho) this.pos.x = -this.tamanho;
	if (this.pos.x < -this.tamanho) this.pos.x = width + this.tamanho;
}

function FlocoTres(x, y, tamanho, velocidade_giro, velocidade_queda) {
	this.pos = createVector(x, y);
	this.angulo = 0;
	this.tamanho = tamanho;
	this.velocidade_giro = velocidade_giro;
	this.velocidade_queda = velocidade_queda;
	return this;
}

FlocoTres.prototype.desenha = function () {
	push();
	translate(this.pos.x + this.tamanho / 2, this.pos.y + this.tamanho / 2);
	rotate(this.angulo);
	image(lilas, -this.tamanho / 2, -this.tamanho / 2, this.tamanho, this.tamanho);
	this.angulo += 0.01 * this.velocidade_giro/5;
	pop();
}

FlocoTres.prototype.mover = function (velocidade_vento) {
	this.pos.y += this.velocidade_queda;
	if (this.pos.y > height) this.pos.y = -this.tamanho;
	this.pos.x += velocidade_vento;
	if (this.pos.x > width + this.tamanho) this.pos.x = -this.tamanho;
	if (this.pos.x < -this.tamanho) this.pos.x = width + this.tamanho;
}

function FlocoQuatro(x, y, tamanho, velocidade_giro, velocidade_queda) {
	this.pos = createVector(x, y);
	this.angulo = 0;
	this.tamanho = tamanho;
	this.velocidade_giro = velocidade_giro;
	this.velocidade_queda = velocidade_queda;
	return this;
}

FlocoQuatro.prototype.desenha = function () {
	push();
	translate(this.pos.x + this.tamanho / 2, this.pos.y + this.tamanho / 2);
	rotate(this.angulo);
	image(vermelho, -this.tamanho / 2, -this.tamanho / 2, this.tamanho, this.tamanho);
	this.angulo += 0.01 * this.velocidade_giro/5;
	pop();
}

FlocoQuatro.prototype.mover = function (velocidade_vento) {
	this.pos.y += this.velocidade_queda;
	if (this.pos.y > height) this.pos.y = -this.tamanho;
	this.pos.x += velocidade_vento;
	if (this.pos.x > width + this.tamanho) this.pos.x = -this.tamanho;
	if (this.pos.x < -this.tamanho) this.pos.x = width + this.tamanho;
}

//Funcao acionada toda vez que o mouse for pressionado
function mousePressed() {
	x = 40;//Cada vez que pressiona o mouse posicao x recebe o valor
	y = 10;//Cada vez que pressiona o mouse posicao y recebe o valor
}