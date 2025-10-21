// test/spec.js
import { fs, is } from '@magic/test'
import path from 'path'
import { getCache } from '../src/lib/getCache.js'

const testDir = path.join(process.cwd(), 'test', '.fixtures')

export default [
  // Test getCache
  {
    fn: async () => {
      try {
        await fs.mkdirp(testDir)
        const testFile1 = path.join(testDir, 'file1.html')
        const testFile2 = path.join(testDir, 'file2.json')
        await fs.writeFile(testFile1, '<html></html>')
        await fs.writeFile(testFile2, '{"test": true}')

        const cache = await getCache(testDir)

        return is.object(cache) && Object.keys(cache).length > 0
      } catch (e) {
        console.error(e)
        return false
      }
    },
    expect: true,
    info: 'getCache returns object with files',
  },
]
