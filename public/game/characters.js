import { collision } from './gamelogic.js'

class Actor
{
    constructor(context, posX, posY, height, width, speed, atk, def)
    {
        this.x      = posX;
        this.y      = posY;
        this.height = height;
        this.width  = width;
        this.atk    = atk;
        this.def    = def;
        this.speed  = speed;
        this.con    = context;
    }

    render()
    {
        this.con.shadowBlur  = 10;
        this.con.shadowColor = "black";
        this.con.fillStyle   = "rgba(255, 0, 0, 0.5)";

        this.con.fillRect(this.x,
                          this.y,
                          this.height,
                          this.width);
    }
}

class Bullet
{
    constructor(context, posX, posY, radius, owner)
    {
        this.con    = context;
        this.x      = posX;
        this.y      = posY;
        this.radius = radius;
        this.owner  = owner;
    }

    render()
    {
        this.con.fillStyle = 'yellow';
        this.con.beginPath();

        this.con.arc(this.x,
                     this.y,
                     this.radius,
                     0,
                     2 * Math.PI);

        this.con.fill();
        this.con.stroke();
    }

    update()
    {
        this.x += 5;
    }
}

export class Player extends Actor
{
    constructor(context, posX, posY, height, width, speed, atk, def)
    {
        super(context, posX, posY, height, width, speed, atk, def);
        this.actions = {
            move: (input, current_map)=>{
                switch(input)
                {
                    case 'w':
                        if(collision(this.x, this.y - this.speed, current_map))
                            this.y -= speed;
                        break;
                    case 'a':
                        if(collision(this.x - this.speed, this.y, current_map))
                            this.x -= speed;
                        break;
                    case 's':
                        if(collision(this.x, this.y + this.height, current_map))
                            this.y += speed;
                        break;
                    case 'd':
                        if(collision(this.x + this.width, this.y, current_map))
                            this.x += speed;
                }
            },
            attack: (target)=>{
                let bullet = new Bullet(this.con,
                                        this.x + (this.width / 2),
                                        this.y + (this.height / 2),
                                        this.width / 8,
                                        'player');

                return bullet;
            },
            interact: (target)=>{
                console.log("Activated");
            },
            update: ()=>{
                console.log('yay');
            }
        };
    }
}
