require('dotenv').config()
const assert = require('assert')
const ElectrumClient = require("../services/ElectrumClient")

const electrumClient = new ElectrumClient()

// certain tests may fail when used with a pruned bitcoin node
describe('Test_ElectrumClient', function () {
    describe('Test_ElectrumXConnection_Header', function () {
        it('should return header height that is not 0', async function () {
            await electrumClient.connect()

            const header = await electrumClient.getHeader()
            console.log('Current header:', header)

            await electrumClient.disconnect()

            assert.ok(header.height > 0)
        });
    })

    describe('Test_GetBalance_Balance', function () {
        it('should return object with confirmed and unconfirmed key', async function () {
            await electrumClient.connect()

            const balance = await electrumClient.getBalance('3MRJtMhE7KNBmeAt9XeS3bBjUb5VeHd6wD')
            console.log('Current balance:', balance)

            await electrumClient.disconnect()

            assert.ok(balance.hasOwnProperty('confirmed') && balance.hasOwnProperty('unconfirmed'))
        });
    })

    describe('Test_GetTransaction_Transaction', function () {
        it('should return transaction', async function () {
            await electrumClient.connect()
            const txid = '03a6f25941e6f0896ff949c5fe82a8cb168ef38b916ee83f6423ca9229a3b604'

            const tx = await electrumClient.getTransaction(txid)
            console.log('Transaction:', tx)

            await electrumClient.disconnect()

            assert.ok(tx.hash === txid)
        });
    })
})
