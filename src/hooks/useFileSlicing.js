import { ref } from "vue";
import { uploadFileAPI } from "../api/uploadFile.js";

export default function useFileSlicing() {
  // 切片默认大小
  const chunkSize = 5 * 1024 * 1024 * 1024;
  // 上传文件切片列表
  const filesSliceList = ref([]);

  // 给所有文件分片
  function chunkAllFile(files) {
    for (let file of files) {
      chunkFile(file);
    }
  }

  // 文件分片
  function chunkFile(file) {
    const fileSize = file.size;
    const chunkCount = Math.ceil(fileSize / chunkSize);

    for (let i = 0; i < chunkCount; i++) {
      // 当前 分割 开始点
      const startPoint = i * chunkSize;
      // 当前分割 结束点
      const endPoint = Math.min(startPoint + chunkSize, fileSize);
      const chunk = file.slice(startPoint, endPoint);
      // 存储分片状态
      filesSliceList.value.push({
        file: chunk,
        name: file.name,
        chunks: chunkCount,
        chunk: i,
      });
    }
  }

  // 上传所有文件
  const promiseArr = [];
  function allUploadHandle(files) {
    chunkAllFile(files);

    filesSliceList.value.forEach((item) => {
      const formData = new FormData();
      formData.append("file", item.file);
      formData.append("name", item.name); //文件名
      formData.append("chunks", item.chunks); //总切片数
      formData.append("chunk", item.chunk); //切片索引

      const curPromise = new Promise((resolve, reject) => {
        uploadFileAPI(
          formData.get("file"),
          formData.get("name"),
          formData.get("chunks"),
          formData.get("chunk")
        )
          .then((res) => {
            item.state = true; //state为true表示上传成功
            return resolve(res);
          })
          .catch((err) => {
            item.state = false; //state为false表示上传失败
            return reject(err);
          });
      });
      promiseArr.push(curPromise);
    });

    Promise.all(promiseArr)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        filesSliceList.value.forEach((item) => {
          if (!item.state) {
            //该文件上传失败
          }
        });
        return false;
      });
  }

  return { allUploadHandle };
}