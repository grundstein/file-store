import path from 'path'

import mimes from '@magic/mime-types'

import { getCompressed } from './getCompressed.mjs'

export const getFileContent = dir => async name => {
  const url = name.replace(dir, '')
  const extension = path.extname(name).substr(1)

  const file = {
    mime: mimes[extension],
    buffer: await getCompressed(name),
    gzip: await getCompressed(`${name}.gz`),
    deflate: await getCompressed(`${name}.deflate`),
    name,
    extension,
    url,
  }

  return [url, file]
}
