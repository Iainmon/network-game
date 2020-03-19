const WebSocket = require('ws')
const Thread = require('async-threading')
const config = require('./config.json')
const PlayerController = require('./src/PlayerController')
const Game = require('./Game')

const gameInstance = new Game();

const options = {
    port: config['socket-port']
}
const wss = new WebSocket.Server(options)

const clients = []

wss.on('connection', function (socket) {

    // Creates new player/client.
    const client = gameInstance.onNewConnection()
    clients.push(client)

    // Register's the player's controll update callback.
    socket.on('message', (message) => client.setKeys(JSON.parse(message)) )

    socket.on('close', () => {
        
        // Tells the player to clean up.
        gameInstance.onEndConnection(client)

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

    /*
    const data = world.states()
    data.gameStates = game.state()
    const encodedData = JSON.stringify(data)

    for (const client of clients) {
        client.socket.send(encodedData)
    }
    */

}, 1000 / minimumUpdateFrequency, false)

console.log(`Starting server on port ${config['socket-port']}.`)
