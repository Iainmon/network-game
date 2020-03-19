import WebSocket from 'ws'
import Thread from 'async-threading'
import Game from '../lib/Game'


const config = {
    'socket-port': 3000
}

const gameInstance = new Game();

const options = {
    port: config['socket-port']
}
const wss = new WebSocket.Server(options)

const clients = []

wss.on('connection', function (socket) {

    // Creates new player/client.
    const player = gameInstance.onNewConnection()
    const client = {
        player: player,
        socket: socket
    }
    clients.push(client)

    // Register's the player's controll update callback.
    socket.on('message', (message: string) => client.player.setKeys(JSON.parse(message)) )

    socket.on('close', () => {
        
        // Tells the player to clean up.
        gameInstance.onEndConnection(client.player)

        // Removes client from client list.
        const index = clients.indexOf(client)
        if (index > -1) clients.splice(index, 1)

        console.log('Player left.')
    })

    // Send initial game state.
    // socket.send(world.getStates())

    console.log('Player joined.')
})

const minimumUpdateFrequency = 60

const serverTick = new Thread( () => {

    gameInstance.update()

    
    const data = gameInstance.compressToPacket()

    //console.log(data)
    const encodedData = JSON.stringify(data, (key, value) => (key === 'parent' || key === 'plugin' || key === 'parts' || key === 'body') ? 'pseudonull' : value)

    for (const client of clients) {
        client.socket.send(encodedData)
    }
    

}, 1000 / minimumUpdateFrequency, false)

console.log(`Starting server on port ${config['socket-port']}.`)
