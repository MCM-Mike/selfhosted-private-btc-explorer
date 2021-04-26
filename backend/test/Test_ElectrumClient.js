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
})
