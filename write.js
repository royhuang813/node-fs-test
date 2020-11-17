const moment = require('moment')
const fs = require('fs')
const path = require('path')
const template = require('./template')

function writeStream(basePath, length) {
  let start = moment().format('x'),
    end,
    totalFiles = 0,
    chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    str;

  function diff(end, start) {
    return end - start
  }

  write(
    basePath,
    length,
    function () {
      end = moment().format('x');
      template({
        writeMethod: '流写入',
        startTime: start,
        endTime: end,
        totalFiles: ++totalFiles,
        totalTime: diff(end, start) + 'ms'
      })
    })

  function write(basePath, length, callback) {
    let str = '';
    for (let i = 0; i < length; i++) {
      let idx = Math.ceil(Math.random() * chars.length);
      str += chars[idx]
    }
    let writerStream = fs.createWriteStream(basePath)
    writerStream.write(str)
    writerStream.end();
    writerStream.on('finish', function () {
      callback && callback()
    })
  }
}

function writeFileSync(basePath, length) {
  let start = moment().format('x'),
    end,
    totalFiles = 0,
    chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    str;

  function diff(end, start) {
    return end - start
  }

  write(
    basePath,
    length,
    function () {
      end = moment().format('x');
      template({
        writeMethod: '同步写入',
        startTime: start,
        endTime: end,
        totalFiles: ++totalFiles,
        totalTime: diff(end, start) + 'ms'
      })
    })

  function write(basePath, length, callback) {
    let str = '';
    for (let i = 0; i < length; i++) {
      let idx = Math.ceil(Math.random() * chars.length);
      str += chars[idx]
    }
    // console.log(str)
    fs.writeFileSync(basePath, str);
    callback && callback()
  }
}

function writeFile(basePath, length) {
  let start = moment().format('x'),
    end,
    totalFiles = 0,
    chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    str;

  function diff(end, start) {
    return end - start
  }

  write(
    basePath,
    length,
    function () {
      end = moment().format('x');
      template({
        writeMethod: '异步写入',
        startTime: start,
        endTime: end,
        totalFiles: ++totalFiles,
        totalTime: diff(end, start) + 'ms'
      })
    })

  function write(basePath, length, callback) {
    let str = '';
    for (let i = 0; i < length; i++) {
      let idx = Math.ceil(Math.random() * chars.length);
      str += chars[idx]
    }
    // console.log(str)
    fs.writeFile(basePath, str, err => {
      if (err) throw err;
      callback && callback()
    })
  }
}

function Write() {
  this.writeFile = function (basePath, length) {
    writeFile(basePath, length);

  }
  this.writeFileSync = function (basePath, length) {
    writeFileSync(basePath, length);
  }
  this.writeStream = function (basePath, length) {
    writeStream(basePath, length);
  }
}

module.exports = new Write();