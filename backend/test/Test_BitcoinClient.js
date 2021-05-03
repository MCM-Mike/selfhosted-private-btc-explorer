require('dotenv').config()
const assert = require('assert')
const BitcoinClient = require("../services/BitcoinClient")

const bitcoinClient = new BitcoinClient()
let block_count = 0

// certain tests may fail when used with a pruned bitcoin node
describe('Test_BitcoinClient', function () {
    describe('Test_NodeConnection_BlockCount', function () {
        it('should return blockCount that is not 0', async function () {
            const blockCount = await bitcoinClient.getBlockCount()

            console.log('Node block height:', blockCount)

            assert.ok(blockCount > 0)
        });
    })

    describe('Test_GetBlock_Hash_Block', function () {
        it('should return block with height 681720', async function () {
            // hash of block 681720
            const hash = '00000000000000000003af75f8db177f2e2a1b3d2cd7e1555beb269b600c574e'
            const height = 681720

            // get block using hash of block index 1
            const block = await bitcoinClient.getBlock(hash)

            console.log('Block height:', block.height)

            assert.equal(block.height, height)
        });
    })

    describe('Test_GetBlockStats_HashOrIndex_BlockStats', function () {
        it('should return stats of block with height 681720', async function () {
            const index = 681720

            const blockStats = await bitcoinClient.getBlockStats(index)

            console.log('Block height:', blockStats.height)

            assert.equal(blockStats.height, index)
        });
    })

    describe('Test_GetBlockRange_FirstIndexANDLastIndex_BlockArray', function () {
        beforeEach(async () => {
            block_count = await bitcoinClient.getBlockCount()
        })

        it('should return array of blocks', async function () {
            // this test can take up to 20 seconds
            this.timeout(20000);

            const firstIndex = block_count - 19
            const lastIndex = block_count - 9

            // get block using hash of block index 1
            const blockArray = await bitcoinClient.getBlockRange(firstIndex, lastIndex)

            //console.log(blockArray)
            console.log('First block height:', blockArray[0].height)
            console.log('Last block height:', blockArray[blockArray.length-1].height)

            assert.equal(JSON.stringify([blockArray[0].height, blockArray[blockArray.length-1].height]), JSON.stringify([firstIndex, lastIndex]))
        });
    })

    describe('Test_GetLatestBlocks_BlockArray', function () {
        it('should return array of last 10 blocks', async function () {
            // this test can take up to 60 seconds
            this.timeout(60000);

            const blockArray = await bitcoinClient.getLatestBlocks()

            console.log('Blocks in array:', blockArray.length)
            console.log('Latest block height:', blockArray[0].height)

            assert.equal((blockArray[0].height - blockArray[blockArray.length-1].height + 1), 10)
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
