const fs = require('fs-extra')
const childProcess = require('child_process')

try {
  // Remove current build
  fs.removeSync('./dist/')

  // Copy front-end files
  fs.copySync('./frontend/build', './dist/public')
  // fs.copySync('./src/views', './dist/views');

  // Transpile the typescript files
  childProcess.exec('tsc --build tsconfig.prod.json', (e, stdout, stderr) => {
    console.log(stdout)
    console.error(stderr)
    if (e) throw Error('Build failed')
  })
} catch (err) {
  console.error(err)
}
