// test/spec.js
import { fs, is } from '@magic/test'
import path from 'path'
import { getFileContent } from '../src/lib/getFileContent.js'

const testDir = path.join(process.cwd(), 'test', '.fixtures')

export default [
  // Test getFileContent
  {
    fn: async () => {
      try {
        await fs.mkdirp(testDir)
        const testFile = path.join(testDir, 'content.js')
        await fs.writeFile(testFile, 'console.log("test")')

        const getContent = getFileContent(testDir)
        const [url, file] = await getContent(testFile)

        return (
          is.string(url) &&
          is.object(file) &&
          is.string(file.mime) &&
          is.string(file.extension) &&
          file.extension === 'js'
        )
      } catch (e) {
        console.error(e)
        return false
      }
    },
    expect: true,
    info: 'getFileContent returns proper file object',
  },

  // Test getFileContent with compressed versions
  {
    fn: async () => {
      try {
        await fs.mkdirp(testDir)
        const testFile = path.join(testDir, 'compressed.css')
        await fs.writeFile(testFile, 'body { color: red; }')
        await fs.writeFile(`${testFile}.gz`, 'gzipped content')
        await fs.writeFile(`${testFile}.deflate`, 'deflated content')

        const getContent = getFileContent(testDir)
        const [url, file] = await getContent(testFile)

        return (
          Buffer.isBuffer(file.buffer) &&
          Buffer.isBuffer(file.gzip) &&
          Buffer.isBuffer(file.deflate) &&
          file.extension === 'css'
        )
      } catch (e) {
        console.error(e)
        return false
      }
    },
    expect: true,
    info: 'getFileContent handles compressed versions',
  },
]
