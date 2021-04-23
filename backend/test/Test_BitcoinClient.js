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

async function Test_GetBlockRange_FirstIndexANDLastIndex_BlockArray() {
    const firstIndex = 383091
    const lastIndex = 383100

    // merkleroot of block 1 + 10
    const firstIndexMerkleroot = 'a83673848bbeebf312b789bbbd1ec9608ec3f822a33c8c4036a63a9d2207fb27'
    const lastIndexMerkleroot = 'fcf97d111fb47e438ace8f1afe963cd12a02c189628f4d32283775f0e31841a8'

    // get block using hash of block index 1
    const blockArray = await bitcoinClient.getBlockRange(firstIndex, lastIndex)

    //console.log(blockArray)
    console.log('Block 383091 merkleroot:', blockArray[0].merkleroot)
    console.log('Block 383100 merkleroot:', blockArray[9].merkleroot)

    assert((blockArray[0].merkleroot + blockArray[9].merkleroot) === (firstIndexMerkleroot + lastIndexMerkleroot))
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

async function runTests() {
    console.log('Running tests..')
    await Test_NodeConnection_BlockCount()
    //await Test_GetBlock_Hash_Block()
    //await Test_GetBlockHash_Index_Hash()
    await Test_GetBlockRange_FirstIndexANDLastIndex_BlockArray()
    console.log('Tests done.')
}

runTests()
