const assert = require('assert');
const BitcoinClient = require("../services/BitcoinClient");

const bitcoinClient = new BitcoinClient();

async function Test_BitcoinNodeConnection_BlockCount() {
    const blockCount = await bitcoinClient.getBlockCount()

    console.log('Node block height:', blockCount)

    assert(blockCount > 0)
}

Test_BitcoinNodeConnection_BlockCount()
