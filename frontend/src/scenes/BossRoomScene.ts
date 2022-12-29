import Phaser from 'phaser'
import Warrior from "../components/character/Warrior";
import socket from "../socket";
import {ActionData, ActionType, Player, Room} from "../type";

export default class BossRoomScene extends Phaser.Scene {
    static key: string = 'boss-room-scene'

    private gameStarted: boolean = false
    private text: Phaser.GameObjects.Text | null
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
        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (pointer.rightButtonDown()) {
                if (this.gameStarted) {
                    socket.onPlayerAction(ActionType.MOVE, {
                        x: pointer.x,
                        y: pointer.y
                    })
                }
            }
        })

        this.text = this.add.text(0, 0, 'Waiting for other users...')
    }

    update(time: number, delta: number) {
    }

    joinRoom(room: Room) {
        room.players.forEach((player) => {
            this.addPlayer(player)
        })
    }

    addPlayer(player: Player) {
        const warrior = new Warrior(this, player.position.x, player.position.y, player.username, 1)
        this.players.push(warrior)
    }

    updatePlayer(player: Player, actionType: ActionType, actionData: ActionData) {
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