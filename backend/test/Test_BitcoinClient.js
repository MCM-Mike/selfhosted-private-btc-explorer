require('dotenv').config()
const assert = require('assert')
const BitcoinClient = require("../services/BitcoinClient")

const bitcoinClient = new BitcoinClient()


describe('Test_BitcoinClient', function () {
    describe('Test_NodeConnection_BlockCount', function () {
        it('should return blockCount that is not 0', async function () {
            const blockCount = await bitcoinClient.getBlockCount()

            console.log('Node block height:', blockCount)

            assert.ok(blockCount > 0)
        });
    })

    describe('Test_GetBlock_Hash_Block', function () {
        it('should return block with height 432088', async function () {
            // hash of block 1
            const hash = '0000000000000000012b1980e0117bd95412f8d0a9235731edd9b9729beb36b5'

            // merkleroot of block 1
            const height = 432088

            // get block using hash of block index 1
            const block = await bitcoinClient.getBlock(hash)

            console.log('Block height:', block.height)

            assert.equal(block.height, height)
        });
    })

    describe('Test_GetBlockRange_FirstIndexANDLastIndex_BlockArray', function () {
        it('should return array of blocks 432001 till 432010', async function () {
            this.timeout(20000); // this test can take up to 20 seconds

            const firstIndex = 432001
            const lastIndex = 432010

            // get block using hash of block index 1
            const blockArray = await bitcoinClient.getBlockRange(firstIndex, lastIndex)

            //console.log(blockArray)
            console.log('First block height:', blockArray[0].height)
            console.log('Last block height:', blockArray[blockArray.length-1].height)

            assert.equal(JSON.stringify([blockArray[0].height, blockArray[blockArray.length-1].height]), JSON.stringify([firstIndex, lastIndex]))
        });
    })

    describe('Test_GetBlockHash_Index_Hash', function () {
        it('should return hash of block with index 432000', async function () {
            // index of block 117
            const index = 432000

            // hash of block 117
            const hash = '00000000000000000206870f30cc306cbf9c80cb05c7fbfc07ad8d7b317c7af6'

            // get block using hash of block index 1
            const blockHash = await bitcoinClient.getBlockHash(index)

            console.log('Block hash:', blockHash)

            assert(blockHash === hash)
        });
    })
})
