const moment = require('moment')
const readlineSync = require('readline-sync')
const os = require('os')
const Read = require('./read');
const Write = require('./write');
const Copy = require('./copy');

let FUNC_TYPE,
  PROCESS_TYPE,
  DESKTOP_PATH;

let tempHomedir = os.homedir();
tempHomedir += `\\Desktop\\`;
DESKTOP_PATH = tempHomedir.replace(/\\/g, '\\\\');




console.log('------文件测试系统------')
console.log('输入对应数字开启对应功能：1.文件读取；2.文件写入；3.文件拷贝')
FUNC_TYPE = ~~readlineSync.question()



function init() {
  switch (FUNC_TYPE) {
    //文件读取
    case 1: {
      console.log('选择异步or同步：1.异步；2.同步；3.流')
      PROCESS_TYPE = ~~readlineSync.question()
      console.log('请指定要读取的文件夹名（仅支持放在桌面的文件夹）')
      DESKTOP_PATH += readlineSync.question()
      console.log('final-path', DESKTOP_PATH)
      switch (PROCESS_TYPE) {
        //异步
        case 1: {
          Read.readFile(DESKTOP_PATH);
          break;
        }
        //同步
        case 2: {
          Read.readFileSync(DESKTOP_PATH);
          break;
        }
        //流
        case 3: {
          Read.readStream(DESKTOP_PATH);
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
      console.log('选择异步or同步：1.异步；2.同步；3.流')
      PROCESS_TYPE = ~~readlineSync.question()
      console.log('请指定要写入的文件名（仅支持放在桌面的文件）')
      DESKTOP_PATH += readlineSync.question()
      console.log('请输入要写入的字符个数（字符将会是随机的a-zA-Z）')
      let CHAR_LENGTH = ~~readlineSync.question()
      console.log('final-path', DESKTOP_PATH)
      switch (PROCESS_TYPE) {
        //异步
        case 1: {
          Write.writeFile(DESKTOP_PATH, CHAR_LENGTH);
          break;
        }
        //同步
        case 2: {
          Write.writeFileSync(DESKTOP_PATH, CHAR_LENGTH);
          break;
        }
        //流
        case 3: {
          Write.writeStream(DESKTOP_PATH, CHAR_LENGTH);
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
      console.log('选择异步or同步：1.异步；2.同步；3.流')
      PROCESS_TYPE = ~~readlineSync.question()
      let TARGET_PATH = DESKTOP_PATH;
      console.log('请指定要拷贝的文件名（仅支持放在桌面的文件）')
      DESKTOP_PATH += readlineSync.question()
      console.log('请输入新文件名（放在桌面上）')
      TARGET_PATH += readlineSync.question()
      console.log('final-path', DESKTOP_PATH)
      switch (PROCESS_TYPE) {
        //异步
        case 1: {
          Copy.copyFile(DESKTOP_PATH, TARGET_PATH);
          break;
        }
        //同步
        case 2: {
          Copy.copyFileSync(DESKTOP_PATH, TARGET_PATH);
          break;
        }
        //流
        case 3: {
          Copy.copyFileStream(DESKTOP_PATH, TARGET_PATH);
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