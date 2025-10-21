import { is } from '@magic/test'

import store from '../src/index.js'

export default [{ fn: () => store, expect: is.fn, info: 'store is a function' }]
