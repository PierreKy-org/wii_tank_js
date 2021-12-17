import Bullet from './Bullet.js'

export default class Char{
    x;
    y;
    angle;
    couleur = "red";
    width = 30;
    height = 30;
    vx = 0;
    vy = 0;
    prevX =0;
    prevY =0;
    bullets = []
    delay_shot = -500;
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.angle = 0;
    }

    draw(ctx){
        ctx.save()
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.width/2, -this.height/2);
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0,0, this.width, this.height);
        ctx.beginPath();
        ctx.moveTo(this.width, this.height/2);
        ctx.lineTo(this.width+20, this.height/2);
        ctx.stroke();
        ctx.restore();
    }

    viseCible(pos) {
        // on calcule l'angle du char en fonction des deux points : sa position et la position
        // de la souris
        if(pos.x === undefined) return;

        const dx = this.x - pos.x;
        const dy = this.y - pos.y;
        this.angle = Math.atan2(-dy, -dx);
    }

    //Permet de se déplacer en modifiant sa vitesse
    move(inputState, width, height){
        if(inputState.left) this.vx = -1.5
        if(inputState.right) this.vx = 1.5
        if(inputState.up ) this.vy = -1.5
        if(inputState.down) this.vy = 1.5
        if (!inputState.left && !inputState.right) this.vx = 0
        if (!inputState.up && !inputState.down) this.vy = 0
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += this.vx;
        this.y += this.vy;
            
        
    }
    //Créer une balle et tire
    shot(){
        if(this.bullets.length < 4){
            let bullet = new Bullet(this.x, this.y, this.angle, 2);
            this.bullets.push(bullet)
        }
    }

    //Ici on vérifie la collision entre le joueur et les murs du jeu
    collision(map,width,height){
        //On vérifie les murs de la map (les murs du canvas)
        if(this.x <  15) this.x =  15;
        if(this.y <  15) this.y =  15;
        if(this.x > width-20) this.x = width-20;
        if(this.y > height-20) this.y = height-20;
        let coordX,coordY,startWidth,endWidth,startHeight,endHeight;
        coordX = Math.floor(this.x/30);
        coordY = Math.floor(this.y/30);
        endWidth = coordX + 1; if(endWidth > 33) endWidth = 33;
        endHeight = coordY + 1; if(endHeight > 17) endHeight = 17;
        startWidth = coordX - 1; if(startWidth < 0) startWidth = 0;
        startHeight = coordY - 1; if(startHeight < 0) startHeight = 0;
        //On vérifie les murs internes de la map
        for(let i = startWidth; i <= endWidth; i++){
            for(let j = startHeight; j <= endHeight; j++){
                if(map[i][j] === 1){
                    if(this.x+15 > i*30 && this.x-15 < (i+1)*30){
                        //Si la collision est détectée alors on renvoie le joueur à sa position précédente
                        if(this.y+15 > j*30 && this.y-15 < (j+1)*30){
                            this.x = this.prevX;
                            this.y = this.prevY;
                        }
                    }
                }
            }
        } 
    }

}