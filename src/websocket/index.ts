
import { iFrame } from "../interfaces";

const players = new Set<Player>()
const roomsController = new RoomsController(players);

export const wsConnectionHandler = (ws:WebSocket)=>{
    let player: Player;
    let bot: Player;
    let room: Room;

    ws.onmessage = (msg:{data:string})=>{
        const frame = JSON.parse(msg.data) as iFrame;
        const {type:frameType, data} = frame;
        const frameData = dataParser(data);
        switch(frameType){
            case 'reg':
            player = new Player(frameData.name, frameData.password,ws);
            players.validate(players)
            ws.send(frameHandler('reg',player.getInfo()))
            if(player.error){
                players.add(player);
                ws.send(frameHandler(update_room, roomsController))
                ws.send(frameHandler(update_winners, getWinners(player)))
            } 
            break;
        }
       
    }


}
