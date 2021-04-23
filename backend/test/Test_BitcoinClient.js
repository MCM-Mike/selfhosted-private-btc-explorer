const assert = require('assert');
const BitcoinClient = require("../services/BitcoinClient");

const bitcoinClient = new BitcoinClient();

async function Test_NodeConnection_BlockCount() {
    const blockCount = await bitcoinClient.getBlockCount()

    console.log('Node block height:', blockCount)

    assert(blockCount > 0)
}

async function Test_GetBlock_Block() {
    // merkleroot of block 1
    const merkleroot = '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098'

    // get block using hash of block index 1
    const block = await bitcoinClient.getBlock('00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048')

    console.log('Block 1 merkleroot:', block.merkleroot)

    assert(block.merkleroot === merkleroot)
}

Test_NodeConnection_BlockCount()
Test_GetBlock_Block()
