// test/spec.js
import { is } from '@magic/test'
import store from '../src/index.js'
import { getCache } from '../src/lib/getCache.js'
import { getCompressed } from '../src/lib/getCompressed.js'
import { getFileContent } from '../src/lib/getFileContent.js'

export default [
  // Basic function tests
  { fn: () => store, expect: is.fn, info: 'store is a function' },
  { fn: () => getCache, expect: is.fn, info: 'getCache is a function' },
  { fn: () => getCompressed, expect: is.fn, info: 'getCompressed is a function' },
  { fn: () => getFileContent, expect: is.fn, info: 'getFileContent is a function' },
]
