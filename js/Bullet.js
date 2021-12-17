export default class Bullet{
    x;
    y;
    prevX;
    prevY;
    angle;
    width = 20;
    height = 2;
    v;
    rebond = 0;
    constructor(x,y,angle,v){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.v = v;
    }

    draw(ctx){
        ctx.save()
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.width/2, -this.height/2);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, this.width, this.height);
        ctx.restore();
    }

    move(width, height){
        //On recupere la position precedente pour le rebond
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += Math.cos(this.angle) * this.v;
        this.y += Math.sin(this.angle) * this.v;
        //Si on touche le bord gauche ou droit on inverse l'angle et on ajoute PI pour créer un rebond
        if(this.x  > width ||this.x < 0 ) {
            this.angle = -this.angle + Math.PI;
            this.x = this.prevX;
           this.rebond += 1;
        }
        //Si on touche le bord haut ou bas on inverse l'angle pour créer un rebond
        if(this.y  >  height ||this.y < 0) {
            this.angle = -this.angle;
            this.y = this.prevY;
            this.rebond += 1;
        }
        
    }

    //On vérifie la collision entre le projectile et les murs de la map
    //j'ai défini chaque carré de la map en 30*30
    collision(map){    
        let coordX,coordY,startWidth,endWidth,startHeight,endHeight;
        //On bloque les sorties de map
        coordX = Math.floor(this.x/30);
        coordY = Math.floor(this.y/30);
        endWidth   = coordX + 1;
        if(endWidth > 33) endWidth = 33;
        endHeight   = coordY + 1; 
        if(endHeight > 17) endHeight = 17;
        startWidth = coordX - 1; 
        if(startWidth < 0) startWidth = 0;
        startHeight = coordY - 1; 
        if(startHeight < 0) startHeight = 0;
    
        for(let i = startWidth; i <= endWidth; i++){
            for(let j = startHeight; j <= endHeight; j++){
                //Si la map possède des 1 alors on vérifie la collision entre la balle et le carré
                if(map[i][j] === 1){
                    if(this.x > i*30 && this.x < (i+1)*30){
                        if(this.y > j*30 && this.y < (j+1)*30){
                            let distX = Math.abs(i*30+15-this.x);
                            let distY = Math.abs(j*30+15-this.y);
                            //Ici je vérifie vers où vient la balle pour adapter le rebond
                            //Il est similaire au rebond sur les murs  (ligne 35 à 45)
                            if(distX > distY){
                                if(this.rebond < 2){
                                    this.x = this.prevX;
                                    this.y = this.prevY;
                                    this.angle = -this.angle + Math.PI;
                                    this.rebond += 1;
                                }
                            }
                            else{
                                if(this.rebond < 2){
                                    this.x = this.prevX;
                                    this.y = this.prevY;
                                    this.angle = -this.angle;
                                    this.rebond += 1;
                                }
                            }
                        }
                    }
                }
            }
        } 
    }
    
}