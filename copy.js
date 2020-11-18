const moment = require('moment')
const fs = require('fs')
const path = require('path')
const template = require('./template')

function copyFileStream(basePath, targetPath) {
  let start = moment().format('x'),
    end,
    totalFiles = 0;

  function diff(end, start) {
    return end - start
  }

  checkDir(basePath, targetPath, copy)

  function printback() {
    end = moment().format('x');
    template({
      copyMethod: '流拷贝',
      startTime: start,
      endTime: end,
      totalFiles: ++totalFiles,
      totalTime: diff(end, start) + 'ms'
    })
  }

  function copy(src, dest) {
    let srcPath = fs.readdirSync(src);
    srcPath.forEach(path => {
      let tempSrc = src + '\\' + path,
        tempDest = dest + '\\' + path;
      fs.stat(tempSrc, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          checkDir(tempSrc, tempDest, copy)
        } else if (stats.isFile()) {
          let readerStream = fs.createReadStream(tempSrc),
            writerStream = fs.createWriteStream(tempDest);
          readerStream.pipe(writerStream)
          printback()
        }
      })
    })
  }

  function checkDir(src, dest, callback) {
    fs.access(dest, err => {
      if (err) {
        fs.mkdirSync(dest)
        callback(src, dest)
      } else {
        callback(src, dest)
      }
    })
  }
}

function copyFileSync(basePath, targetPath) {
  let start = moment().format('x'),
    end,
    totalFiles = 0;

  function diff(end, start) {
    return end - start
  }

  checkDir(basePath, targetPath, copy)

  function printback() {
    end = moment().format('x');
    template({
      copyMethod: '同步拷贝',
      startTime: start,
      endTime: end,
      totalFiles: ++totalFiles,
      totalTime: diff(end, start) + 'ms'
    })
  }

  function copy(src, dest) {
    let srcPath = fs.readdirSync(src);
    srcPath.forEach(path => {
      let tempSrc = src + '\\' + path,
        tempDest = dest + '\\' + path;
      fs.stat(tempSrc, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          checkDir(tempSrc, tempDest, copy)
        } else if (stats.isFile()) {
          fs.copyFileSync(tempSrc, tempDest)
          printback()
        }
      })
    })
  }

  function checkDir(src, dest, callback) {
    fs.access(dest, err => {
      if (err) {
        fs.mkdirSync(dest)
        callback(src, dest)
      } else {
        callback(src, dest)
      }
    })
  }
}

function copyFile(basePath, targetPath) {
  let start = moment().format('x'),
    end,
    totalFiles = 0;

  function diff(end, start) {
    return end - start
  }

  checkDir(basePath, targetPath, copy)

  function printback() {
    end = moment().format('x');
    template({
      copyMethod: '异步拷贝',
      startTime: start,
      endTime: end,
      totalFiles: ++totalFiles,
      totalTime: diff(end, start) + 'ms'
    })
  }

  function copy(src, dest) {
    let srcPath = fs.readdirSync(src);
    srcPath.forEach(path => {
      let tempSrc = src + '\\' + path,
        tempDest = dest + '\\' + path;
      fs.stat(tempSrc, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          checkDir(tempSrc, tempDest, copy)
        } else if (stats.isFile()) {
          fs.copyFile(tempSrc, tempDest, () => {
            printback()
          })
        }
      })
    })
  }

  function checkDir(src, dest, callback) {
    fs.access(dest, err => {
      if (err) {
        fs.mkdirSync(dest)
        callback(src, dest)
      } else {
        callback(src, dest)
      }
    })
  }
}

function Copy() {
  this.copyFile = function (basePath, targetPath) {
    copyFile(basePath, targetPath);
  }
  this.copyFileSync = function (basePath, targetPath) {
    copyFileSync(basePath, targetPath);
  }
  this.copyFileStream = function (basePath, targetPath) {
    copyFileStream(basePath, targetPath);
  }
}

module.exports = new Copy();