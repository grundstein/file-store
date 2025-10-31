## @grundstein/file-store

### WIP. NOT IN PRODUCTION YET!

reads a directory of files, then initializes a @grundstein/memstore with that data and returns it.

#### [@grundstein/mem-store](https://github.com/grundstein/mem-store)

minimal, memory only, key -> value store for nodejs.

#### installation

```bash
npm i @grundstein/file-store
```

#### usage

```javascript
import fileStore from '@grundstein/file-store'

const dir = 'public'

const store = fileStore(dir)

store.get('file.txt') // 'contents and metadata of public/file.txt'
```

this library gets used by @grundstein/server to serve static files.

#### changelog

#### v0.0.2 - unreleased

#### v0.0.1

first release
