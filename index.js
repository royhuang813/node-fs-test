const moment = require('moment')
const readlineSync = require('readline-sync')
const os = require('os')
const Read = require('./read')

let FUNC_TYPE,
  PROCESS_TYPE,
  READ_DIR;

let tempHomedir = os.homedir();
tempHomedir += `\\Desktop\\`;
READ_DIR = tempHomedir.replace(/\\/g, '\\\\');




console.log('------文件测试系统------')
console.log('输入对应数字开启对应功能：1.文件读取；2.文件写入；3.文件拷贝')
FUNC_TYPE = ~~readlineSync.question()
console.log('选择异步or同步：1.异步；2.同步')
PROCESS_TYPE = ~~readlineSync.question()


function init() {
  switch (FUNC_TYPE) {
    //文件读取
    case 1: {
      console.log('请指定要读取的文件夹名（仅支持放在桌面的文件夹）')
      READ_DIR += readlineSync.question()
      console.log('r', READ_DIR)
      switch (PROCESS_TYPE) {
        //异步
        case 1: {
          Read.readFile(READ_DIR);
          break;
        }
        //同步
        case 2: {
          Read.readFileSync(READ_DIR);
          break;
        }
        default: {
          console.log('\r异步/同步选项错误')
          break;
        }
      }
      break;
    }
    //文件写入
    case 2: {
      switch (PROCESS_TYPE) {
        //异步
        case 1: {
          break;
        }
        //同步
        case 2: {
          break;
        }
        default: {
          console.log('\r异步/同步选项错误')
          break;
        }
      }
      break;
    }
    //文件拷贝
    case 3: {
      switch (PROCESS_TYPE) {
        //异步
        case 1: {
          break;
        }
        //同步
        case 2: {
          break;
        }
        default: {
          console.log('\r异步/同步选项错误')
          break;
        }
      }
      break;
    }
    default: {
      console.log('\r未找到对应功能')
      break;
    }
  }
}

init();