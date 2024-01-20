import {map} from './map.js';
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const env = new Image();
env.src = 'lofiEnvironment.png';
const cha = new Image();
cha.src = 'lofiChar.png';
ctx.imageSmoothingEnabled = false;

let camera = {
  x:0,
  y:0,
  width:650,
  height:650,
}

function drawTile() { 
  // start col/row, end col/row
  var startCol = Math.floor(camera.x / 48)-1;
  var endCol = startCol + (14);
  var startRow = Math.floor(camera.y / 48);
  var endRow = startRow + (14);
  var offsetX = -camera.x + startCol * 48;
  var offsetY = -camera.y + startRow * 48;
for(var l = 0;l<2;l++){
  for (var c = startCol; c <= endCol; c++) {
      for (var r = startRow; r <= endRow; r++) {
          var tile = map[l][r * 101 + c];
          var x = (c - startCol) * 48 + offsetX;
          var y = (r - startRow) * 48 + offsetY;
          switch(l){
            case 0:
          if (tile !== 0) { // 0 => empty tile
              ctx.drawImage(
                  env, // image
                  (tile) * 8 + 48, // source x
                  32, // source y
                  8, // source width
                  8, // source height
                  Math.round(x),  // location x
                  Math.round(y), // location y
                  48, // sprite width
                  48 // sprite height
              );
            }
            break;
            case 1:
              if (tile !== 0) { // 0 => empty tile
                ctx.drawImage(
                    env, // image
                    (tile) * 8 + 48, // source x
                    32, // source y
                    8, // source width
                    8, // source height
                    Math.round(x)-8,  // location x
                    Math.round(y)-40, // location y
                    64, // sprite width
                    64 // sprite height
                );
          }
          break;
          }
      }
  }
}
};

var kys = [false,false,false,false]

addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      kys[0] = true
      break;
    case "a":
      kys[1] = true
      break;
    case "s":
     kys[2] = true
      break;
    case "d":
      kys[3] = true
      break;
  }
}, true);

addEventListener("keyup", function (event) {
  switch (event.key) {
    case "w":
      kys[0] = false
      break;
    case "a":
      kys[1] = false
      break;
    case "s":
      kys[2] = false
      break;
    case "d":
      kys[3] = false
      break;
  }
}, true);

function move(){
  let spd = 4
  let count = kys.filter(Boolean).length;
  if (count == 2){spd = 3}
  if (kys[0]){camera.y-=spd}
  if (kys[1]){camera.x-=spd}
  if (kys[2]){camera.y+=spd}
  if (kys[3]){camera.x+=spd}
}  

function clear(){
  ctx.clearRect(0,0,800,600)
  ctx.fillStyle = "darkblue"
  ctx.fillRect(0,0,800,600)
}

function drawPlayer(){
  ctx.drawImage(cha,0,0,8,8,276,400,48,48);
}

function UI(){
  ctx.fillStyle = '#333333';
  ctx.fillRect(600,0,200,600)
}

function gameloop() {
  clear()
  drawTile()
  drawPlayer()
  move()
  UI()
  requestAnimationFrame(gameloop)
}
gameloop()
