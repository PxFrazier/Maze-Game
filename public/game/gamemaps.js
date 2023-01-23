import { Graph } from "./DataStructures/graph.js";

export class GameMaps
{
    constructor(context, json_map)
    {
        this.map        = json_map[0]['map1'];
        this.tileHeight = 50;
        this.tileWidth  = 50;
        this.con        = context;
        this.map_list   = json_map;
        this.rows       = this.map.length;
        this.cols       = this.map[0].length;
        this.id         = this.map_list[0]['id'];
        this.graph      = new Graph(this.id);

        this.graph.operations.set('room_one', 'room_two');
        this.graph.operations.set('room_two', 'room_one');
    }

    getTexture(argument)
    {
        //This where we'll set textures
    }

    render()
    {   
        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0; j < this.cols; j++)
            {
                switch(this.map[i][j])
                {
                    case 0:
                        this.con.shadowBlur  = 10;
                        this.con.shadowColor = "black";
                        this.con.fillStyle   = "#fff";
                        break;
                    case 1:
                        this.con.shadowBlur  = 10;
                        this.con.shadowColor = 'red';
                        this.con.fillStyle   = "#333";
                        break;
                    case 2:
                    case 3:
                        this.con.shadowBlur  = 10;
                        this.con.shadowColor = 'blue';
                        this.con.fillStyle   = 'blue';
                }
                this.con.fillRect(this.tileHeight * j,
                                  this.tileWidth * i,
                                  this.tileWidth,
                                  this.tileHeight);
            }
        }
    }
}