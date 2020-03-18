const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 9001 })
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(message)
        ws.send(message)
    })

    // ws.send('somethingdd')
    
})