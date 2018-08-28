const fs = require('fs')
const path = require('path')
const glob = require('glob')
const child_process = require('child_process');
const files = glob.sync(path.join(__dirname, '../src/**/'))
const fileNameExp = /\/src\/(.*?)\/$/

function makeDirs(filepath, rootPath) {
  if (path.resolve(__dirname, filepath) === path.resolve(rootPath)) return
  if (!fs.existsSync(filepath)) {
    makeDirs(path.dirname(filepath), rootPath)
  }
  fs.mkdirSync(path.resolve(__dirname, filepath))
}

function build(fileName, outputPath) {
  fs.readFile(path.resolve(__dirname, '../drag.html'), 'utf8', (err, data) => {
    if (err) throw new Error(err)
    outputHtml = data.replace(/<!-- inject (\S+) -->/g, (match, $1) => {
      return `images/${$1}.png`
    })
    fs.stat(`${outputPath}`, (err, stat) => {
      if (err) {
        makeDirs(`${outputPath}`, path.resolve(__dirname, '../build'))
      }
      fs.writeFile(`${outputPath}/${fileName}.html`, outputHtml, err => {
        if (err) throw new Error(err)
        console.log(`file ${fileName}.html has been saved!`)
      })
      child_process.spawn('cp', ['-rf', path.resolve(__dirname, '../src/birthday/'), path.resolve(__dirname, '../build/birthday/images')])
    })
  })
}

files.map(item => {
  const fileName = fileNameExp.exec(item) && fileNameExp.exec(item)[1]
  if (!fileName) {
    return
  }
  const outputPath = path.resolve(__dirname, `../build/${fileName}`)
  if (fs.existsSync(outputPath)) {
    const ls = child_process.spawn('rm', ['-rf', path.resolve(__dirname, outputPath)])
    ls.on('close', () => {
      build(fileName, outputPath)
    })
  } else {
    build(fileName, outputPath)
  }
})