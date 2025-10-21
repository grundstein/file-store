import fs from '@magic/fs'

/**
 *
 *
 * @param {string} fileName
 * @returns {Promise<Buffer | false>}
 */
export const getCompressed = async fileName => {
  try {
    return await fs.readFile(fileName)
  } catch (e) {
    return false
  }
}
