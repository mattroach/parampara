import fs from 'fs'
import path from 'path'

export default function(publicDir: string) {
  const indexProvider = getFileContents(path.resolve(publicDir, 'index.html'))
    .then(async content => {
      // In prod, inject google analytics
      if (process.env.NODE_ENV === 'production') {
        const google = await getFileContents(
          path.resolve(publicDir, 'google-analytics.html')
        )
        return content.replace('<head>', '<head>' + google)
      } else {
        return content
      }
    })
    .catch(err => {
      console.error('Error fetching index', err)
      return 'Error fetching index - see logs'
    })

  return {
    async get() {
      return await indexProvider
    },
    async getWith(headers: string) {
      const content = await indexProvider
      return content.replace('</head>', headers + '</head>')
    }
  }
}

const getFileContents = (path: string): Promise<string> =>
  new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8', (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
