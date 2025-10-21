// test/spec.js
import { fs, is, tryCatch } from '@magic/test'
import path from 'path'
import store from '../src/index.js'

const relativeTestDir = path.join('test', '.fixtures')

const testDir = path.join(process.cwd(), relativeTestDir)

const isStore = store =>
  is.objectNative(store) &&
  is.fn(store.get) &&
  is.fn(store.set) &&
  is.fn(store.getAll) &&
  is.fn(store.getAll)

export default [
  // Test store with empty argument
  {
    fn: async () => {
      try {
        await store()
        return false
      } catch (e) {
        return e.code
      }
    },
    expect: 'E_DIR_EMPTY',
    info: 'store throws error when called without arguments',
  },

  // Test store with non-string argument
  {
    fn: tryCatch(store, 123),
    expect: is.error,
    info: 'store throws error when called with non-string argument',
  },

  // Test store with non-existent directory
  {
    fn: tryCatch(store, '/non/existent/directory'),
    expect: is.error,
    info: 'store throws error when directory does not exist',
  },

  // Test store with relative path
  {
    fn: () => store(relativeTestDir),
    before: async () => {
      await fs.mkdirp(testDir)

      // Create a test file
      const testFile = path.join(testDir, 'test.txt')
      await fs.writeFile(testFile, 'test content')

      return async () => {
        await fs.rmrf(testDir)
      }
    },
    expect: isStore,
    info: 'store works with relative path',
  },

  // Test store with absolute path
  {
    fn: () => store(testDir),
    before: async () => {
      await fs.mkdirp(testDir)

      return async () => {
        await fs.rmrf(testDir)
      }
    },
    expect: isStore,
    info: 'store works with absolute path',
  },

  // Test full integration
  {
    fn: () => store(testDir),
    expect: t => is.objectNative(t) && is.fn(t.get) && is.fn(t.set),
    before: async () => {
      await fs.mkdirp(testDir)

      const testFile = path.join(testDir, 'integration.txt')
      await fs.writeFile(testFile, 'integration test')

      return async () => {
        await fs.rmrf(testDir)
      }
    },
    info: 'store returns memStore with expected methods',
  },
]
