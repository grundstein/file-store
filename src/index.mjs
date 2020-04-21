import path from 'path'

import error from '@magic/error'
import fs from '@magic/fs'
import is from '@magic/types'
import log from '@magic/log'

import memStore from '@grundstein/mem-store'

import { getCache } from './lib/index.mjs'

const libName = '@grundstein/file-store'

export const fileStore = async (dir = {}) => {
  const startTime = log.hrtime()

  if (is.empty(dir)) {
    throw error(`${libName}: first argument can not be empty`, 'DIR_EMPTY')
  }

  if (!is.string(dir)) {
    throw error(`${libName}: first argument must be a string, received ${typeof dir}`, 'DIR_TYPE')
  }

  if (!path.isAbsolute(dir)) {
    dir = path.join(process.cwd(), dir)
  }

  const exists = await fs.exists(dir)

  if (!exists) {
    throw error(`${libName}: directory ${dir} does not exist.`, 'DIR_NO_EXIST')
  }

  log.info(`${libName}: loading ${dir}`);

  const cache = await getCache(dir)

  const memCache = memStore(cache)

  log.timeTaken(startTime, 'fileStore init took')

  return memCache
}

export default fileStore
