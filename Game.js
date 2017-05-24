var tela;
var ctx;
var antes = 0;
var dt = 0;
var mapa;
var pc;
var imglib;

function init() {
  tela = document.getElementsByTagName('canvas')[0];
  tela.width = 600;
  tela.height = 480;
  ctx = tela.getContext('2d');
  imglib = new ImageLoader();
  imglib.load("pc", "pc.png");
  imglib.load("floor", "LPC Base Assets/tiles/dirt2.png");
  imglib.load("mountain", "LPC Base Assets/tiles/mountains.png");
  mapa = new Map(12, 15);
  mapa.imageLib = imglib;
  mapa.loadMap([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 9, 1, 0, 0, 0, 0, 9, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 9, 1, 0, 0, 0, 0, 0, 9, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]);
  pc = new Sprite();
  pc.imageLib = imglib;
  pc.x = 50;
  pc.y = 50;
  configuraControles();

  requestAnimationFrame(passo);
}

function passo(t) {
  dt = (t - antes) / 1000;
  ctx.clearRect(0, 0, tela.width, tela.height);
  requestAnimationFrame(passo);
  mapa.persegue(pc);
  pc.moverOnMap(mapa, dt);
  mapa.moverInimigosOnMap(mapa, dt);
  mapa.desenhar(ctx);
  pc.desenhar(ctx);
  imglib.drawImageTile(ctx, "pc", 3, 0, 64, 0, 0);
  antes = t;
}

function configuraControles() {
  addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 37:
        pc.vx = -100;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:
        pc.vy = -100;
        pc.pose = 3;
        e.preventDefault();
        break;
      case 39:
        pc.vx = +100;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40:
        pc.vy = +100;
        pc.pose = 1;
        e.preventDefault();
        break;
      default:
    }
  });
  addEventListener("keyup", function(e) {
    switch (e.keyCode) {
      case 37:
        pc.vx = 0;
        pc.pose = 6;
        e.preventDefault();
        break;
      case 39:
        pc.vx = 0;
        pc.pose = 4;
        e.preventDefault();
        break;
      case 38:
        pc.vy = 0;
        pc.pose = 7;
        e.preventDefault();
        break;
      case 40:
        pc.vy = 0;
        pc.pose = 5;
        e.preventDefault();
        break;
      default:
    }
  });









}
