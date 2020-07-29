import { is } from '@magic/test'

import store from '../src/index.mjs'

export default [{ fn: () => store, expect: is.fn, info: 'store is a function' }]
