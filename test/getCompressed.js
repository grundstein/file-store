// test/spec.js
import path from 'path'
import fs from '@magic/fs'
import { getCompressed } from '../src/lib/getCompressed.js'

const testDir = path.join(process.cwd(), 'test', '.fixtures')

export default [
  // Test getCompressed with existing file
  {
    fn: async () => {
      await fs.mkdirp(testDir)
      const testFile = path.join(testDir, 'compressed.txt')
      await fs.writeFile(testFile, 'compressed content')

      const result = await getCompressed(testFile)
      return Buffer.isBuffer(result)
    },
    info: 'getCompressed returns buffer for existing file',
  },

  // Test getCompressed with non-existent file
  {
    fn: getCompressed('/non/existent/file.txt'),
    expect: false,
    info: 'getCompressed returns false for non-existent file',
  },
]
