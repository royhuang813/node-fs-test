const chalk = require('chalk')

function print(params) {
  const {
    readMethod,
    writeMethod,
    copyMethod,
    startTime,
    endTime,
    totalFiles,
    totalTime
  } = params
  console.log(
    chalk.green(
      `
    --------------------------------
    读取方式：${readMethod}

    写入方式：${writeMethod}

    拷贝方式：${copyMethod}

    开始时间：${startTime}

    结束时间：${endTime}

    共计文件数：${totalFiles}

    共计耗时：${totalTime}
    --------------------------------
    `
    )
  )
}

module.exports = print