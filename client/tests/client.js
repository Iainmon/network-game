const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:9001')


const data = {
    package: {
        list: [
            1,
            2,
            3
        ]
    }
}

ws.on('open', () => {
    ws.send(JSON.stringify(data))
})


ws.on('message', (message) => {
    console.log(message)
    ws.send(JSON.stringify(data))
})