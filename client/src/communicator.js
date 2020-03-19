export default class Communicator {
    constructor(destination, port) {
        this.ws = new WebSocket(`ws://${destination}:${port}`)
    }

    send(data) {
        this.ws.send(JSON.stringify(data))
    }

    onRecieve(lambda) {
        this.ws.onmessage = lambda
    }
}