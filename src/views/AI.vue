<template>
  <div class="container">
    <Header />
    <div class="chat-box" ref="chatBox">
      <ul>
        <li
          v-for="(item, index) in chatlist"
          :key="index"
          :style="{ justifyContent: item.type ? 'flex-end' : 'flex-start' }"
        >
          <img
            v-if="!item.type"
            class="robot-avatar"
            src="../assets/robot.svg"
            alt=""
          />
          <div v-if="!item.type" class="bubbleL">{{ item.str }}</div>
          <div v-if="item.type" class="bubbleR">{{ item.str }}</div>
          <img
            v-if="item.type"
            class="user-avatar"
            src="../assets/smile.png"
            alt=""
          />
        </li>
      </ul>
    </div>
    <Speech @sendRecord="sendRecord" class="speech" ref="speech"></Speech>
    <QueryS v-if="isQueryOne" />
    <div class="ipt-box">
      <input
        ref="ipt"
        type="text"
        id="search"
        :placeholder="holder"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup="enter"
        v-model="content"
      />
      <label for="upload">
        <UploadOutlined class="i_upload" />
      </label>
      <a @click="submitMsg" id="sub-btn">发送</a>
    </div>
    <!-- 上传文件（隐藏） -->
    <a-upload
      id="upload"
      :file-list="fileList"
      :before-upload="beforeUpload"
      @remove="handleRemove"
    >
      <a-button style="display: none">
        <upload-outlined></upload-outlined>
        Select File
      </a-button>
    </a-upload>
    <div class="circle">
      <img class="yy" src="../assets/yy.svg" alt="" @click="record" />
    </div>
    <Loading id="loading" v-show="!flag" />
  </div>
</template>

<script setup>
import { ref, defineComponent, watch, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
//组件
import Header from "../components/Header/index.vue";
import Speech from "../components/SpeechRecognition/index.vue";
import Loading from "../components/Loading/index.vue";
import QueryS from "../components/Query/queryS.vue";
//API
import { centreAPI } from "../api/AI.js";
import { uploadFileAPI } from "../api/uploadFile.js";

const router = useRouter();
const speech = ref(null);
const flag = ref(true);
const isQueryOne = ref(false); //是否查询的是单个人

function record() {
  if (flag.value) {
    speech.value.speakClick();
  } else {
    speech.value.speakEndClick();
  }
  flag.value = !flag.value;
}

//上传文件
const fileList = ref([]);
const handleRemove = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
const beforeUpload = (file) => {
  fileList.value = [...(fileList.value || []), file];
  return false;
};
const handleUpload = async () => {
  if(content.value !== '') AIidentify();
  const formData = new FormData();
  fileList.value.forEach((file) => {
    formData.append("file", file);
  });
  fileList.value.forEach((item) => {
      content.value += " 📄" + item.name + " ";
    });
  try {
    const res = await uploadFileAPI(formData);
    console.log("fileList-res", res);
    message.success("上传成功");
    dialogMoveWithStr("上传成功");
    fileList.value = [];
  } catch (err) {
    message.error("上传失败");
    dialogMoveWithStr("上传文件失败，请重试😭");
    console.error(err);
  }
};

//输入框
const ipt = ref(null);
const content = ref(""); //v-model绑定
const holder = ref("请输入您想要查询的内容");
function handleFocus() {
  holder.value = "";
}
function handleBlur() {
  holder.value = "请输入您想要查询的内容";
}
function enter(e) {
  if (e.code === "Enter") submitMsg();
}
//聊天框
let chatlist = ref([
  {
    type: 0,
    str: `您好，请问您需要什么帮助？`,
  },
]);
let chatBox = ref(null);
function dialogMoveWithStr(str, delay = 0, callback) {
  setTimeout(() => {
    if (str) {
      chatlist.value.push({
        type: 0,
        str,
      });
    }
    if (callback) callback();
    nextTick(() => {
      chatBox.value.scrollTop += chatBox.value.scrollHeight;
    });
  }, delay);
}
function AIidentify() {
  let cx = /查询([\u4e00-\u9fa5]{2,4})$/;
  let sc = /删除([\u4e00-\u9fa5]{2,4})$/;
  let tj =
    /添加([\u4e00-\u9fa5]+)\s+(\d{1,2})\s+([\u4e00-\u9fa5]+)\s+(\d+)\s+(\d+)\s+([\u4e00-\u9fa5]+)$/;
  let xg =
    /修改([\u4e00-\u9fa5]{2,4})的信息：([\u4e00-\u9fa5]{2,4}\s+\d+\s+(男|女)\s+\d{7}\s+\d{7}\s+[\u4e00-\u9fa5]{2,4})$/;
  isQueryOne.value = false;
  if (cx.test(content.value)) {
    dialogMoveWithStr("请稍等，正在为您查询……", 600);
    dialogMoveWithStr("查询完成!", 1500, () => {
      isQueryOne.value = true;
    });
  } else if (sc.test(content.value)) {
    dialogMoveWithStr("请稍等，正在为您删除数据……", 600);
    dialogMoveWithStr("删除成功!", 1500);
  } else if (tj.test(content.value)) {
    dialogMoveWithStr("请稍等，正在为您添加数据……", 600);
    dialogMoveWithStr("添加成功!", 1500);
  } else if (xg.test(content.value)) {
    dialogMoveWithStr("请稍等，正在为您修改数据……", 600);
    dialogMoveWithStr("修改成功!", 1500);
  } else {
    let str = `格式错误。\n请参照以下示例： \n
    1.查询所有学生
    2.查询李一（格式为：查询+学生姓名）
    3.添加罗 20 男 5615156 5611541 陈老师”（格式为：添加+学生姓名+空格+年龄+空格+电话+空格+学号+空格+辅导员姓名）
    4.修改李一的信息：李三 20 男 5615156 5611541 陈老师（格式为：修改+学生姓名+的信息：学生姓名+空格+空格+电话+空格+学号+空格+辅导员姓名）
    5.删除罗（格式为：删除+学生姓名）
    注意：在关键信息出现之前，前面的文字不做规定，如：我想要删除罗二（只要删除之前不出现：增加’修改，查询这些关键字），这是可以的。但在之后不能有多余的文字，如：删除罗二吧。`;
    dialogMoveWithStr(str, 600);
  }
}
function submitMsg() {
  if (content.value === "" && fileList.value.length === 0) {
    return false;
  } else if (fileList.value.length !== 0) {
    handleUpload();
  } else if (content.value === "查询所有学生") {
    router.push({
      path: "/queryS",
    });
  } else {
    centreAPI(content.value).then((res) => {
      console.log("centreAPI-res", res);
    });
    AIidentify();
    if (isQueryOne.value) {
      //单人查询代码
    }
  }
  chatlist.value.push({
    type: 1,
    str: content.value,
  });
  content.value = "";
  ipt.value.focus();
  dialogMoveWithStr();
}

const sendRecord = (val) => {
  content.value = val;
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chat-box {
  position: relative;
  width: 60rem;
  height: 20rem;
  margin-top: 3%;
  background-color: rgba(240, 255, 252, 0.5);
  // border: 3px solid rgb(137, 197, 183, 0.1);
  overflow-y: scroll;
  ul {
    list-style: none;
    margin-left: -1rem;
  }

  li {
    display: flex;
    position: relative;
    // border: 1px solid plum;
    white-space: pre-line; //否则换行符\n没有效果
    padding: 10px;
    .robot-avatar {
      position: absolute;
      left: 2%;
      width: 5%;
    }
    .user-avatar {
      position: absolute;
      top: 10%;
      right: 2%;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }

    .bubbleL,
    .bubbleR {
      position: relative;
      padding: 0.2% 1%;
      background-color: #fff;
      border: #ccc solid 1px;
      min-height: 3.5vh;
    }

    .bubbleL {
      left: 8%;
      margin: 1% 10% 0 0;
      text-align: left;
    }

    .bubbleR {
      margin: 0 6% 0 10%;
      text-align: right;
    }

    .bubbleL:before {
      width: 0px;
      height: 0px;
      position: absolute;
      top: 3px;
      left: -16px;
      padding: 0;
      border: 8px solid transparent;
      border-color: transparent #fff transparent transparent;
      content: "";
      z-index: 12;
    }

    .bubbleL:after {
      width: 0px;
      height: 0px;
      position: absolute;
      top: 2.5px;
      left: -18px;
      padding: 0;
      border: 9px solid transparent;
      border-color: transparent #ccc transparent transparent;
      content: "";
      z-index: 10;
    }

    .bubbleR:before {
      width: 0px;
      height: 0px;
      position: absolute;
      top: 3px;
      right: -16px;
      padding: 0;
      border: 8px solid transparent;
      border-color: transparent transparent transparent #fff;
      content: "";
      z-index: 12;
    }

    .bubbleR:after {
      width: 0px;
      height: 0px;
      position: absolute;
      top: 2px;
      right: -18px;
      padding: 0;
      border: 9px solid transparent;
      border-color: transparent transparent transparent #ccc;
      content: "";
      z-index: 10;
    }
  }
}
.chat-box {
  position: relative;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    height: -10px;
    background: #dcf5ef;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    // border-radius: 15px;
    background-color: #82c7b7;
  }
}

.ipt-box {
  width: 60vw;
  border: 3px solid rgba(137, 197, 183, 0.4);
  background-color: rgba(240, 255, 252, 0.5);
  position: relative;
  margin-top: 4%;
  margin-bottom: -1.5%;

  #search {
    float: left;
    width: 50.2vw;
    outline: none;
    height: 7vh;
    white-space: nowrap;
    overflow-x: scroll;
    border: none;
  }

  .i_upload {
    position: absolute;
    width: 6%;
    height: 7vh;
    text-align: center;
    line-height: 7vh;
    right: 10%;
    cursor: pointer;
    font-size: 22px;
    color: rgb(110, 161, 149);
    border-left: 3px solid rgba(137, 197, 183, 0.4);
  }

  #sub-btn {
    position: absolute;
    right: 0%;
    border-left: 3px solid rgba(137, 197, 183, 0.337);
    width: 10%;
    height: 7vh;
    line-height: 7vh;
    color: rgb(137, 197, 183, 0.8);
  }
}

.circle {
  width: 5rem;
  height: 5rem;
  margin-top: 3%;
  border-radius: 50%;
  border: 3px solid rgb(137, 197, 183, 0.5);
}

.yy {
  margin-top: 15px;
  width: 50px;
}

.speech {
  display: none;
}

#loading {
  margin-top: 2.2%;
  margin-left: -3.5%;
}
</style>
