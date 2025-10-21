export function fileStore(dir: string): Promise<MemStore>
export default fileStore
export type FileObject = {
  /**
   * - MIME type of the file
   */
  mime: string
  /**
   * - File content buffer
   */
  buffer: Buffer | false
  /**
   * - Gzipped file content buffer
   */
  gzip: Buffer | false
  /**
   * - Deflated file content buffer
   */
  deflate: Buffer | false
  /**
   * - Full file path
   */
  name: string
  /**
   * - File extension
   */
  extension: string
  /**
   * - URL path (relative to directory)
   */
  url: string
}
export type MemStore = import('@grundstein/mem-store').MemStore<any>
