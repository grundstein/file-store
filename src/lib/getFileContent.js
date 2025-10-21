import path from 'path'

import mimes from '@magic/mime-types'

import { getCompressed } from './getCompressed.js'

/**
 * Creates a function that extracts file content for a given directory
 * @param {string} dir - Base directory path
 * @returns {(name: string) => Promise<[string, import('../index.js').FileObject]>} Function that processes a file path
 */
export const getFileContent = dir => async name => {
  const url = name.replace(dir, '')

  const extension = path.extname(name).substring(1)
  const mimeType = /** @type {keyof typeof mimes} */ (extension)

  const mime = mimes[mimeType]

  /** @type {import('../index.js').FileObject} */
  const file = {
    mime,
    buffer: await getCompressed(name),
    gzip: await getCompressed(`${name}.gz`),
    deflate: await getCompressed(`${name}.deflate`),
    name,
    extension,
    url,
  }

  return [url, file]
}
