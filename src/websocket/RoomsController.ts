import { Player } from "./PlayerClass";
import { Room } from "./Room";
export class RoomsController extends Array<Room> {
  #players: Set<Player>;
  constructor(connections: Set<Player>) {
    super();
    this.#players = connections;
  }
  private announcement() {
    this.#players.forEach((item) =>
      item.ws.send(
        JSON.stringify({
          type: "room_update",
          data: JSON.stringify(this),
          id: 0,
        })
      )
    );
  }
  create() {
    const room = new Room(this.#players);
    this.push(room);
    this.announcement();
    return room;
  }
  addPlayer(id: string, player: Player) {
    const room = this.find((room) => room.roomId === id) as Room;
    room?.addPlayer(player);
    if (room?.roomUsers.length === 2) {
      this.splice(this.indexOf(room), 1);
      this.announcement();
      return room;
    }
  }
}
