/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-10 17:58:58
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-13 15:51:28
 * @ Description: FileChunkUpload 文件切块上传
 */

/** 导入脚本 */
self.importScripts('/spark-md5.min.js')

/** 生成文件 hash */
self.onmessage = (e) => {
  const { fileChunkList } = e.data
  const spark = new self.SparkMD5.ArrayBuffer()
  let percentage = 0
  let count = 0
  const loadNext = (index) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(fileChunkList[index].file)
    reader.onload = (e) => {
      count++
      spark.append(e.target.result)
      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end(),
        })
        self.close()
      } else {
        percentage += 100 / fileChunkList.length
        self.postMessage({
          percentage,
        })
        loadNext(count)
      }
    }
  }
  loadNext(0)
}
