const assert = require('assert');
const BitcoinClient = require("../services/BitcoinClient");

const bitcoinClient = new BitcoinClient();

async function Test_NodeConnection_BlockCount() {
    const blockCount = await bitcoinClient.getBlockCount()

    console.log('Node block height:', blockCount)

    assert(blockCount > 0)
}

async function Test_GetBlock_Hash_Block() {
    // hash of block 1
    const hash = '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048'

    // merkleroot of block 1
    const merkleroot = '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098'

    // get block using hash of block index 1
    const block = await bitcoinClient.getBlock(hash)

    console.log('Block 1 merkleroot:', block.merkleroot)

    assert(block.merkleroot === merkleroot)
}

async function Test_GetBlockHash_Index_Hash() {
    // index of block 117
    const index = 117

    // hash of block 117
    const hash = '0000000099bf32f17e8d5103e990c108c6f2caa6bd17283a77ca026a8c3bc4c8'

    // get block using hash of block index 1
    const blockHash = await bitcoinClient.getBlockHash(index)

    console.log('Block 117 hash:', blockHash)

    assert(blockHash === hash)
}

Test_NodeConnection_BlockCount()
Test_GetBlock_Hash_Block()
Test_GetBlockHash_Index_Hash()
