import path from 'path'

import error from '@magic/error'
import fs from '@magic/fs'
import is from '@magic/types'
import log from '@magic/log'

import memStore from '@grundstein/mem-store'

import { getCache } from './lib/index.js'

const libName = '@grundstein/file-store'

/**
 * @typedef {Object} FileObject
 * @property {string} mime - MIME type of the file
 * @property {Buffer|false} buffer - File content buffer
 * @property {Buffer|false} gzip - Gzipped file content buffer
 * @property {Buffer|false} deflate - Deflated file content buffer
 * @property {string} name - Full file path
 * @property {string} extension - File extension
 * @property {string} url - URL path (relative to directory)
 */

/**
 * @typedef {import('@grundstein/mem-store').MemStore<any>} MemStore
 */

/**
 * Creates a file store from a directory, loading all files into memory
 * @param {string} dir - Directory path (absolute or relative)
 * @returns {Promise<MemStore>} Memory store containing all files
 * @throws {Error} When directory is empty, not a string, or doesn't exist
 */

export const fileStore = async dir => {
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

  log.info(`${libName}: loading ${dir}`)

  const cache = await getCache(dir)

  const memCache = memStore(cache)

  log.timeTaken(startTime, 'fileStore init took')

  return memCache
}

export default fileStore
