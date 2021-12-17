import Char from './Char.js';
import IA from './IA.js'
//Au chargement du js 

window.onload = init;


let canvas,height,width,ctx;
let player = null;
let map = [];
let level;
let time = 0;
let alive;
let ennemies = []
let inputState = {
    left : false,
    right : false,
    up : false,
    down : false,
    z : false
}

let mousePos = {
    x : 0,
    y : 0
}

var btn = document.getElementById("btn");
btn.addEventListener("click", function() {
    btn.style.display = "none";
	init();
}, false);


function init(){
    console.log("Page chargée")
    canvas = document.querySelector('#myCanvas');
    width = canvas.width;
    height = canvas.height;
    ctx = canvas.getContext('2d');
    player = new Char(100,250);
    alive = true;
    level = 1;
    map = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    ennemies = [];
    ennemies.push(new IA(650,250));
    ennemies.push(new IA(900,250));
    creerEcouteurs();
    requestAnimationFrame(mainloop);
    
}


function creerEcouteurs(){
    if(player != null ){
        window.onkeydown = traiteKeyDown;
        window.onkeyup = traiteKeyUp;
        canvas.onmousemove = traiteDeplacementSouris;
    }
    else{
        console.log("player null");
    }
}

function traiteDeplacementSouris(event){
    let x = event.clientX;
    let y = event.clientY;

    let rect = canvas.getBoundingClientRect();
    mousePos.x = x - rect.left;
    mousePos.y = y - rect.top;
    
}

function traiteKeyDown(event){
    
    switch(event.key){
        case 'q':
            inputState.left = true;
            break;
        case 'd':
            inputState.right = true;
            break;
        case 'z':
            inputState.up = true;
            break;
        case 's':
            inputState.down = true;
            break;
        case ' ':
            inputState.z = true;
            break;
    }
}

function traiteKeyUp(event){
    switch(event.key){
        case 'q':
            inputState.left = false;
            break;
        case 'd':
            inputState.right = false;
            break;
        case 'z':
            inputState.up = false;
            break;
        case 's':
            inputState.down = false;
            break;
        case ' ':
            inputState.z = false;
            break;
    }
}

let x = Date.now();
function mainloop(){
    ctx.clearRect(0,0,width,height)
    //On affiche les murs et les entités
    drawScreen(ctx,ennemies,player);
    //Si la souris est reconnu alors le joueur peut viser et se déplacer
    if (mousePos) {
        player.viseCible(mousePos);
        player.move(inputState, width, height);
    }
    //Les ennemies se déplacent et on vérifie la collision avec les murs
    for(let i = 0; i < ennemies.length; i++){
        ennemies[i].move();
        ennemies[i].collision(map,width,height);
    }
    //On vérifie la collision entre le joueur et les murs
    player.collision(map,width,height);

    //On utilise date.now pour fabriquer un temps d'attente entre 2 tirs
    let y = x - Date.now()
    if(inputState.z & y < player.delay_shot){
        player.shot();
        x = Date.now();
    }
    
    //On vérifie la collision entre les balles du joueur et les ennemies
    bulletCollisionPlayer(ennemies, player);
    
    time = (time +10)%500;
    //L'IA des ennemies
    enemyAI(time);
    for(let i = 0; i < ennemies.length; i++){
        bulletCollisionEnnemies(ennemies[i], player);
    }

    //Si un ennemie nous touche alors on perd
    for(let i = 0; i < ennemies.length; i++){
        if(player.x-15 < ennemies[i].x+15 && player.x+15 > ennemies[i].x-15){
            if(player.y-15 < ennemies[i].y+15 && player.y+15 > ennemies[i].y-15){
                alive = false;
                drawDeath(false);
                
            }
        }
    }

    //Si on tue tous les ennemies alors on gagne
    if(ennemies.length == 0){
        nextLevel();
    } 
    if(alive){
        requestAnimationFrame(mainloop);
    }
}

//Ici on affiche un message de victoire ou de défaite au milieu du canvas
function drawDeath(win) {
    ctx.clearRect(0, 0, width, height);
    if(!win){
        ctx.font = "20px Courier New";
        ctx.textAlign = 'center';
        ctx.fillStyle = "#000000";
        ctx.fillText("GAME OVER (appuie sur le bouton à gauche pour rejouer)", canvas.width/2, canvas.height/2);

    }
    else{
        ctx.font = "20px Courier New";
        ctx.textAlign = 'center';
        ctx.fillStyle = "#000000";
        ctx.fillText("YOU WIN (appuie sur le bouton à gauche pour rejouer)", canvas.width/2, canvas.height/2);
    }
    btn = document.querySelector('#btn');
    btn.style.display = 'block';
    
}

//On affiche les murs puis le joueur puis les ennemies
function drawScreen(ctx, ennemies, player){
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            if(map[i][j] === 1){
                ctx.beginPath();
                ctx.lineWidth=1;
                ctx.strokeStyle="black";
                ctx.fillStyle="rgb(230,230,230)";
                ctx.rect(i*30-0.5,j*30-0.5,30,30);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    player.draw(ctx)
    ennemies.forEach(ia1 => ia1.draw(ctx))
}

//La collision des balles du joueur
function bulletCollisionPlayer(ennemies, player){
    //collision murs
    if(player.bullets.length != 0){
        player.bullets.forEach(element => {
            element.draw(ctx);
            element.move(width, height);
            element.collision(map,width,height);
            //Si la balle a déjà fait un rebond alors en disparaitra en touchant un mur 
            if(element.rebond == 2){
                player.bullets.splice(player.bullets.indexOf(element),1);
            }
            if(ennemies.length > 0){
                //On vérifie la collision entre les balles du joueur et les ennemies
                ennemies.forEach(ennemi => {
                    if (element.x- element.width/2 < ennemi.x + ennemi.width/2  &&
                        element.x + element.width/2 > ennemi.x-15 &&
                        element.y -element.height/2 < ennemi.y + ennemi.height/2  &&
                        element.height/2 + element.y > ennemi.y-15) {
                        ennemies.splice(ennemies.indexOf(ennemi),1);
                    }
                    else{
                        element.couleur = "black";
                    }
                
                    });
            }
        });
        
    }

}
//La collision des balles des ennemies
function bulletCollisionEnnemies(ennemie, player){
    if(ennemie.bullets.length != 0){
        ennemie.bullets.forEach(element => {
            element.draw(ctx);
            element.move(width, height);
            element.collision(map,width,height);
            //Si la balle a déjà fait un rebond alors en disparaitra en touchant un mur 
            if(element.rebond == 2){
                ennemie.bullets.splice(ennemie.bullets.indexOf(element),1);
            }
            //On vérifie la collision entre les balles de l'ennemi et le joueur
            if (element.x- element.width/2 <player.x + player.width/2 &&
                element.x + element.width/2 > player.x -15 &&
                element.y -element.height/2 < player.y + player.height/2  &&
                element.height/2 + element.y > player.y -15) {
                //Si la balle touche le joueur alors on perd
                alive = false;
                drawDeath(false);
            }
            else{
                element.couleur = "black";
            }
        });
        
    }

}

//--Enemy AI
function enemyAI(time){
    for(let i = 0; i < ennemies.length; i++){
        let inSight = true;
        for(let m = 0; m < map.length; m++){
            for(let n = 0; n < map[m].length; n++){
                if(map[m][n] == 1){
                    //Ici on crée une ligne entre le joueur et l'IA
                    let currColide = lineRect(player.x,player.y,ennemies[i].x,ennemies[i].y,m*30,n*30,30,30);
                    // si la ligne est coupé par un élément du décord alors on se déplace aléatoirement (ligne 352)
                    if(currColide){
                        inSight = false;
                        break;
                    }
                }
            }
        }
        //Si il y a une vision direct avec le joueur
        if(inSight){
            //alors l'ennemi vise le joueur
            ennemies[i].viseCible(player);
            //et tire à chaque fois que time%500 == 0
            if(time == 0){
                ennemies[i].shot();
            }
            //Il essaye aussi de se déplacer vers le joueur
            let distX = Math.abs(ennemies[i].x-player.x);
            let distY = Math.abs(ennemies[i].y-player.y);
            if(distX > distY){
                if(player.x < ennemies[i].x){
                    ennemies[i].vx = -0.5;
                }
                else{
                    ennemies[i].vx = 0.5;
                }
            }
            else{
                if(player.y < ennemies[i].y){
                    ennemies[i].vy = -0.5;
                }
                else{
                    ennemies[i].vy = 0.5;
                }
            }
            continue;
        }
        //Si il n'y a pas de vision direct avec le joueur alors on varie aléatoirement la vitesse de l'ennemi et son angle de tir
        if(time == 0){
            let random = Math.floor(Math.random()*4);
            switch(random){
                case 0:
                    ennemies[i].vx = 0.5;
                    ennemies[i].vy = 0;
                    break;
                case 1:
                    ennemies[i].vx = -0.5;
                    ennemies[i].vy = 0;
                    break;
                case 2:
                    ennemies[i].vx = 0;
                    ennemies[i].vy = 0.5;
                    break;
                case 3:
                    ennemies[i].vx = 0;
                    ennemies[i].vy = -0.5;

                    break;
            }            
            if(ennemies[i].vx != 0) ennemies[i].angle++;
            else ennemies[i].angle--;
        }
    } 
}
//LineRect est une fonction de vérification de collision entre un trait et un rectangle
//J'ai utilisé cet article pour vérifier la collision : http://www.jeffreythompson.org/collision-detection/line-rect.php
function lineRect(x1,y1,x2,y2,rx,ry){
    let left   = lineLine(x1,y1,x2,y2,rx,ry,rx,ry+30);
    let right  = lineLine(x1,y1,x2,y2,rx+30,ry,rx+30,ry+30);
    let top    = lineLine(x1,y1,x2,y2,rx,ry,rx+30,ry);
    let bottom = lineLine(x1,y1,x2,y2,rx,ry+30,rx+30,ry+30);
    if (left || right || top || bottom) return true;
    else return false;
}

//LineLine est une fonction de vérification de collision entre deux traits
//J'ai utilisé cet article pour vérifier la collision : http://www.jeffreythompson.org/collision-detection/line-rect.php
function lineLine(x1,y1,x2,y2,x3,y3,x4,y4){
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    if(uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) return true;
    else return false;
}

//La fonction permet de changer de niveau
function nextLevel(){
    switch(level){
        default:break;
        case 1:
            level++;
            player = new Char(150,100);
            ennemies.push(new IA(740,30));
            ennemies.push(new IA(740,150));
            ennemies.push(new IA(260,470));
            ennemies.push(new IA(260,350));
            map = [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0],
                [0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            break;
        case 2:
            level++;
            player = new Char(30,30);
            ennemies.push(new IA(300,45));
            ennemies.push(new IA(750,45));
            ennemies.push(new IA(630,255));
            ennemies.push(new IA(300,455));
            ennemies.push(new IA(750,455));
            map = [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0],
                [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            break;
        case 3:
            drawDeath(true);
            alive = false;
            break;
    }
}