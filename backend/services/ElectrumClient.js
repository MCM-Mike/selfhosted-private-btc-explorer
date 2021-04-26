const MempoolElectrumClient = require('@mempool/electrum-client')

const USER = process.env.ELECTRUM_RPC_USER
const PASS = process.env.ELECTRUM_RPC_PASSWORD
const HOST = process.env.ELECTRUM_RPC_HOST
const PORT = process.env.ELECTRUM_RPC_PORT

class ElectrumClient {
    client

    constructor() {
        this.setup()
    }

    setup() {
        let hostUrl = HOST
        if (PASS) hostUrl = `${USER}:${PASS}@${HOST}`
        this.client = new MempoolElectrumClient(PORT, hostUrl, 'tcp')
    }

    async connect() {
        try {
            await this.client.connect('btc-explorer')
        } catch (err) {
            console.error(err)
        }
    }

    async disconnect() {
        try {
            await this.client.close()
        } catch (err) {
            console.error(err)
        }
    }

    async getHeader() {
        return await this.rpcCall('blockchain.headers.subscribe', [])
    }

    // method: string, params: []
    async rpcCall(method, params) {
        let data;

        try {
            data = await this.client.request(method, params)
        } catch (error) {
            data = undefined
            console.error(error)
        }

        return data
    }
}

module.exports = ElectrumClient
