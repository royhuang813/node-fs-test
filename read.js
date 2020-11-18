const moment = require('moment')
const fs = require('fs')
const path = require('path')
const template = require('./template')

function readStream(basePath) {
  let start = moment().format('x'),
    end,
    totalFiles = 0;

  function diff(end, start) {
    return end - start
  }

  mapDir(
    basePath,
    function (file) {
      // console.log('TCL: file', file.toString())
      end = moment().format('x');
      template({
        readMethod: '流读取',
        startTime: start,
        endTime: end,
        totalFiles: ++totalFiles,
        totalTime: diff(end, start) + 'ms'
      })
      // 读取文件后的处理
    },
    function (filename) {
      // console.log(`${filename}文件目录遍历完了`)
    }
  )

  function mapDir(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
      // console.log('FFF',files)
      if (err) {
        console.error(err)
        return
      }
      files.forEach((filename, index) => {
        let pathname = path.join(dir, filename)
        fs.stat(pathname, (err, stats) => { // 读取文件信息
          if (err) {
            console.log('获取文件stats失败')
            return
          }
          if (stats.isDirectory()) {
            mapDir(pathname, callback, finish)
          } else if (stats.isFile()) {
            // if (['.json', '.less'].includes(path.extname(pathname))) { // 排除 目录下的 json less 文件
            //   return
            // }
            let data = '';
            let readerStream = fs.createReadStream(pathname)
            readerStream.setEncoding('UTF8')
            readerStream.on('data', function (chunk) {
              data += chunk;
            })
            readerStream.on('end', function () {
              callback && callback(data)
            })
          }
        })
        if (index === files.length - 1) {
          finish && finish(filename)
        }
      })
    })
  }
}

function readFileSync(basePath) {
  let start = moment().format('x'),
    end,
    totalFiles = 0;

  function diff(end, start) {
    return end - start
  }

  mapDir(
    basePath,
    function (file) {
      // console.log('TCL: file', file.toString())
      end = moment().format('x');
      template({
        readMethod: '同步读取',
        startTime: start,
        endTime: end,
        totalFiles: ++totalFiles,
        totalTime: diff(end, start) + 'ms'
      })
      // 读取文件后的处理
      // fs.open('read.txt', 'a', function(err,fd){
      //   fs.write(fd, file.toString(), (err) => {
      //     if (err) throw err;
      //   })
      // })
    },
    function (filename) {
      // console.log(`${filename}文件目录遍历完了`)
    }
  )

  function mapDir(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
      if (err) {
        console.error(err)
        return
      }
      files.forEach((filename, index) => {
        let pathname = path.join(dir, filename)
        fs.stat(pathname, (err, stats) => { // 读取文件信息
          if (err) {
            console.log('获取文件stats失败')
            return
          }
          if (stats.isDirectory()) {
            mapDir(pathname, callback, finish)
          } else if (stats.isFile()) {
            // if (['.json', '.less'].includes(path.extname(pathname))) { // 排除 目录下的 json less 文件
            //   return
            // }
            let data = fs.readFileSync(pathname)
            callback && callback(data)
          }
        })
        if (index === files.length - 1) {
          finish && finish(filename)
        }
      })
    })
  }
}

function readFile(basePath) {
  let start = moment().format('x'),
    end,
    totalFiles = 0;

  function diff(end, start) {
    return end - start
  }

  mapDir(
    basePath,
    function (file) {
      // console.log('TCL: file', file.toString())
      end = moment().format('x');
      template({
        readMethod: '异步读取',
        startTime: start,
        endTime: end,
        totalFiles: ++totalFiles,
        totalTime: diff(end, start) + 'ms'
      })
      // 读取文件后的处理
    },
    function (filename) {
      // console.log(`${filename}文件目录遍历完了`)
    }
  )

  function mapDir(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
      if (err) {
        console.error(err)
        return
      }
      files.forEach((filename, index) => {
        let pathname = path.join(dir, filename)
        fs.stat(pathname, (err, stats) => { // 读取文件信息
          if (err) {
            console.log('获取文件stats失败')
            return
          }
          if (stats.isDirectory()) {
            mapDir(pathname, callback, finish)
          } else if (stats.isFile()) {
            // if (['.json', '.less'].includes(path.extname(pathname))) { // 排除 目录下的 json less 文件
            //   return
            // }
            fs.readFile(pathname, (err, data) => {
              if (err) {
                console.error(err)
                return
              }
              callback && callback(data)
            })
          }
        })
        if (index === files.length - 1) {
          finish && finish(filename)
        }
      })
    })
  }
}

function Read() {
  this.readFile = function (basePath) {
    readFile(basePath);
  }
  this.readFileSync = function (basePath) {
    readFileSync(basePath);
  }
  this.readStream = function (basePath) {
    readStream(basePath);
  }
}

module.exports = new Read();