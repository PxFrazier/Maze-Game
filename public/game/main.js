import { Player }   from "./characters.js";
import { GameMaps } from "./gamemaps.js";
import { fetchMap, completeMovement } from "./gamelogic.js";

const canvas   = document.querySelector("[class='screen']");
const con      = canvas.getContext("2d");
var isMoving   = false;
var currentKey = null;
var onDoorTile = false;

canvas.height = 400;
canvas.width  = 400;

let myMap  = new GameMaps(con,                                            //context
                         (await fetchMap('/game/json_files/maps.json'))); //fetch map from json file

let player = new Player(con,               //context
                        canvas.width / 2,  //player x position
                        canvas.height / 2, //player y position
                        50,                //player height
                        50,                //player width
                        5,                 //player speed
                        10,                //player attack
                        10);               //player defense

var toBeRendered = [myMap, player];

//Handles all player actions
window.addEventListener('keydown', (event)=>{
    if(!isMoving && (player.x % myMap.tileWidth == 0 && player.y % myMap.tileHeight == 0) && !onDoorTile)
    {
        isMoving   = true;
        currentKey = event.key;
    }

    if(event.key == 'f')
        toBeRendered.push(player.actions.attack(null));
});

window.addEventListener('keyup', ()=>{
    isMoving = false;
});

//Main loop for animation
const animate = ()=>{
    con.clearRect(0, 0, canvas.width, canvas.height);

    toBeRendered.forEach(entry =>{
        entry.render();
        entry.update?.();
    });

    completeMovement(isMoving, player, currentKey, myMap, onDoorTile);

    requestAnimationFrame(animate);
}
animate();