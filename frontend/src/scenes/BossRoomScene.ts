import Phaser from 'phaser'
import Warrior from "../components/character/Warrior";
import LavaMap from "../components/map/LavaMap";
import Orc from "../components/monster/Orc";
import socket from "../socket";
import {ActionType, Boss, Player, PlayerUpdateProp, Room} from "../type";

export default class BossRoomScene extends Phaser.Scene {
    static key: string = 'boss-room-scene'

    private gameStarted: boolean = false
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys
    private text: Phaser.GameObjects.Text | null
    private orc?: Orc
    private players: Warrior[] = []

    constructor() {
        super(BossRoomScene.key);
        socket.onGameStart(this.startGame.bind(this))
        socket.onPlayerJoin(this.addPlayer.bind(this))
        socket.onRoomJoin(this.joinRoom.bind(this))
        socket.onPlayerUpdate(this.updatePlayer.bind(this))

        this.text = null
    }

    preload() {
    }

    create() {
        const map = new LavaMap(this)
        this.input.mouse.disableContextMenu();
        this.input.on(Phaser.Input.Events.POINTER_UP, (pointer: Phaser.Input.Pointer) => {
            if (pointer.rightButtonReleased()) {
                if (this.gameStarted) {
                    socket.onPlayerAction({
                        actionType: ActionType.MOVE,
                        actionData: {
                            x: pointer.x,
                            y: pointer.y
                        }
                    })
                }
            }
        })

        this.cursor = this.input.keyboard.createCursorKeys()
        this.text = this.add.text(0, 0, 'Waiting for other users...')
    }

    update(time: number, delta: number) {
        if (!this.gameStarted) return

        let direction: 'left' | 'right' | 'up' | 'down' | null = null
        if (this.cursor?.left.isDown) {
            direction = "left"
        }
        if (this.cursor?.right.isDown) {
            direction = "right"
        }
        if (this.cursor?.up.isDown) {
            direction = "up"
        }
        if (this.cursor?.down.isDown) {
            direction = "down"
        }
        this.players[0].move(direction)
    }

    joinRoom(room: Room) {
        room.players.forEach((player) => {
            this.addPlayer(player)
        })

        this.addBoss(room.boss)
    }

    addBoss(boss: Boss) {
        this.orc = new Orc(this, boss.position.x, boss.position.y, 3)
        this.orc.depth = 1
    }

    addPlayer(player: Player) {
        const warrior = new Warrior(this, player.position.x, player.position.y, player.username, 0.7)
        warrior.depth = 1
        this.players.push(warrior)
    }

    updatePlayer({player, actionType, actionData}: PlayerUpdateProp) {
        console.log("updating player")
    }

    startGame() {
        console.log('game start')
        if (this.text) {
            let count = 3
            const timer = setInterval(() => {
                if (this.text) {
                    this.text.text = `Game will begin in .... ${count}`
                }
                if (count <= 0) {
                    if (this.text) {
                        this.text.text = ''
                    }
                    this.gameStarted = true
                    clearInterval(timer)
                }
                count = count - 1
            }, 1000)
        }
    }
}