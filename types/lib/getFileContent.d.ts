export function getFileContent(
  dir: string,
): (name: string) => Promise<[string, import('../index.js').FileObject]>
