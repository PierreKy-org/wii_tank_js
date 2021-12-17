import Bullet from './Bullet.js'
export default class IA{
    x;
    y;
    width = 30;
    height = 30;
    rebond = 0;
    angle;
    vx = 0;
    vy = 0;
    bullets = [];
    couleur = "green"
    constructor(x,y){
        
        this.x = x;
        this.y = y;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.moveTo(this.width, this.height / 2);
        ctx.lineTo(this.width + 20, this.height / 2);
        ctx.stroke();
        ctx.restore();
    }


   move(){
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.vx;
    this.y += this.vy;
   }

   viseCible(pos) {
    // on calcule l'angle du char en fonction des deux points : sa position et la position du joueur
    if (pos.x === undefined) return;
    const dx = this.x - pos.x;
    const dy = this.y - pos.y;
    this.angle = Math.atan2(-dy, -dx);
  }
    //Ici on vérifie la collision entre l'IA et les murs du jeu
   collision(map,width,height){
    //On vérifie les murs de la map (les murs du canvas)
    if(this.x <  15) this.x =  15;
    if(this.y <  15) this.y =  15;
    if(this.x > width-20) this.x = width-20;
    if(this.y > height-20) this.y = height-20;
    let coordX,coordY,startI,endI,startJ,endJ;
    coordX = Math.floor(this.x/30);
    coordY = Math.floor(this.y/30);
    endI   = coordX + 1; if(endI > 33) endI = 33;
    endJ   = coordY + 1; if(endJ > 17) endJ = 17;
    startI = coordX - 1; if(startI < 0) startI = 0;
    startJ = coordY - 1; if(startJ < 0) startJ = 0;
    //On vérifie les murs internes de la map
    for(let i = startI; i <= endI; i++){
        for(let j = startJ; j <= endJ; j++){
            if(map[i][j] === 1){
                if(this.x+15 > i*30 && this.x-15 < (i+1)*30){
                    //Si la collision est détectée alors on renvoie l'IA à sa position précédente
                    if(this.y+15 > j*30 && this.y-15 < (j+1)*30){
                        this.x = this.prevX;
                        this.y = this.prevY;
                    }
                }
            }
        }
    } 
}

//Tire une balle
shot() {
    if (this.bullets.length < 1) {
      let bullet = new Bullet(this.x, this.y, this.angle, 2);
      this.bullets.push(bullet);
    }
  }
}


