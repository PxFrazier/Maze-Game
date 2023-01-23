export const collision = (posX, posY, current_map)=>{
    let currentTile = current_map.map[Math.floor(posY / current_map.tileHeight)][Math.floor(posX / current_map.tileWidth) ];

    switch(currentTile)
    {
        case 0:
            return true;
        case 1:
            return false;
        case 2:
            current_map.graph.traverse('room_two');
            current_map.map = current_map.map_list.find(entry => {if(entry.id == current_map.graph.current) return entry}).map2;
            return true;
        case 3:
            current_map.graph.traverse('room_one');
            current_map.map = current_map.map_list.find(entry => {if(entry.id == current_map.graph.current) return entry}).map1;
            return true;
    }
};

export const fetchMap = async (url)=>{
    const response = await fetch(url);
    const data     = await response.json();

    return data;
};

export const completeMovement = (flag, character, key, currentMap)=>{
    if(flag)
        character.actions.move(key, currentMap);
    if(!flag && (character.x % currentMap.tileWidth != 0 || character.y % currentMap.tileHeight != 0))
        character.actions.move(key, currentMap);
};