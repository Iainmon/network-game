export default class Communicator {

    private ws: WebSocket;

    constructor(destination: string, port: number) {
        this.ws = new WebSocket(`ws://${destination}:${port}`)
    }

    send(data: any) {
        this.ws.send(JSON.stringify(data))
    }

    onRecieve(lambda: any) {
        this.ws.onmessage = lambda
    }
}