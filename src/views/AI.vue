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
    <!-- <div class="floating">
      <img src="../assets/robot.svg" alt="" />
      <span class="text">{{ message }}</span>
    </div> -->
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
      <a @click="submitMsg" ghost class="query-btn" id="sub-btn">发送</a>
    </div>
    <div class="circle">
      <img class="yy" src="../assets/yy.svg" alt="" @click="record" />
    </div>
    <Loading id="loading" v-show="!flag" />
  </div>
</template>

<script setup>
import { ref, defineComponent, watch, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
//组件
import Header from "../components/Header/index.vue";
import Speech from "../components/SpeechRecognition/index.vue";
import Loading from "../components/Loading/index.vue";

const router = useRouter();
const speech = ref(null);
const message = ref("");
const flag = ref(true);

function record() {
  if (flag.value) {
    speech.value.speakClick();
  } else {
    speech.value.speakEndClick();
  }
  flag.value = !flag.value;
}
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
function AIidentify() {
  // let r = eval(`/^${str}/`);
  let cx = /查询([\u4e00-\u9fa5]{2,4})$/;
  let sc = /删除([\u4e00-\u9fa5]{2,4})$/;
  let tj =
    /添加([\u4e00-\u9fa5]+)\s+(\d{1,2})\s+([\u4e00-\u9fa5]+)\s+(\d+)\s+(\d+)\s+([\u4e00-\u9fa5]+)$/;
  let xg =
    /修改([\u4e00-\u9fa5]{2,4})的信息：([\u4e00-\u9fa5]{2,4}\s+\d+\s+(男|女)\s+\d{7}\s+\d{7}\s+[\u4e00-\u9fa5]{2,4})$/;
  if (cx.test(content.value)) {
    setTimeout(() => {
      chatlist.value.push({
        type: 0,
        str: "请稍等，正在为您查询……",
      });
      nextTick(() => {
        chatBox.value.scrollTop += chatBox.value.scrollHeight;
      });
    }, 600);
    setTimeout(() => {
      router.push({
        path: "/queryS",
      });
    }, 1500);
  } else if (sc.test(content.value)) {
    setTimeout(() => {
      chatlist.value.push({
        type: 0,
        str: "请稍等，正在为您删除数据……",
      });
      nextTick(() => {
        chatBox.value.scrollTop += chatBox.value.scrollHeight;
      });
    }, 600);
    setTimeout(() => {
      chatlist.value.push({
        type: 0,
        str: "删除成功！",
      });
      nextTick(() => {
        chatBox.value.scrollTop += chatBox.value.scrollHeight;
      });
    }, 1500);
  } else if (tj.test(content.value)) {
    setTimeout(() => {
      chatlist.value.push({
        type: 0,
        str: "请稍等，正在为您添加数据……",
      });
      nextTick(() => {
        chatBox.value.scrollTop += chatBox.value.scrollHeight;
      });
    }, 600);
    setTimeout(() => {
      chatlist.value.push({
        type: 0,
        str: "添加成功！",
      });
      nextTick(() => {
        chatBox.value.scrollTop += chatBox.value.scrollHeight;
      });
    }, 1500);
  } else if (xg.test(content.value)) {
    setTimeout(() => {
      chatlist.value.push({
        type: 0,
        str: "请稍等，正在为您修改数据……",
      });
      nextTick(() => {
        chatBox.value.scrollTop += chatBox.value.scrollHeight;
      });
    }, 600);
    setTimeout(() => {
      chatlist.value.push({
        type: 0,
        str: "修改成功！",
      });
      nextTick(() => {
        chatBox.value.scrollTop += chatBox.value.scrollHeight;
      });
    }, 1500);
  } else {
    setTimeout(() => {
      chatlist.value.push({
        type: 0,
        str: `格式错误。\n请参照以下示例： \n
    1.查询所有学生
    2.查询李一（格式为：查询+学生姓名）
    3.添加罗 20 男 5615156 5611541 陈老师”（格式为：添加+学生姓名+空格+年龄+空格+电话+空格+学号+空格+辅导员姓名）
    4.修改李一的信息：李三 20 男 5615156 5611541 陈老师（格式为：修改+学生姓名+的信息：学生姓名+空格+空格+电话+空格+学号+空格+辅导员姓名）
    5.删除罗（格式为：删除+学生姓名）
    注意：在关键信息出现之前，前面的文字不做规定，如：我想要删除罗二（只要删除之前不出现：增加’修改，查询这些关键字），这是可以的。但在之后不能有多余的文字，如：删除罗二吧。`,
      });
      nextTick(() => {
        chatBox.value.scrollTop += chatBox.value.scrollHeight;
      });
    }, 600);
  }
}
function submitMsg() {
  if (content.value === "") {
    return false;
  } else if (content.value === "查询所有学生") {
    router.push({
      path: "/queryS",
    });
  } else {
    AIidentify();
  }
  chatlist.value.push({
    type: 1,
    str: content.value,
  });
  content.value = "";
  ipt.value.focus();
  nextTick(() => {
    chatBox.value.scrollTop += chatBox.value.scrollHeight;
  });
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
    // border-radius: 15px;
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

.floating {
  animation: floating 2s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.ipt-box {
  position: relative;
  #search {
    outline: none;
    margin-top: 4%;
    width: 60vw;
    height: 7vh;
    // border: 3px solid rgb(137, 197, 183, 0.5);
    border: 3px solid rgba(137, 197, 183, 0.4);
    background-color: rgba(240, 255, 252, 0.5);
    // border-radius: 25px;
  }

  #sub-btn {
    position: absolute;
    top: 21%;
    right: 0%;
    border-left: 3px solid rgba(137, 197, 183, 0.337);
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

.query-btn {
  width: 10%;
  height: 6.6vh;
  line-height: 6.6vh;
  margin-top: 2.2%;
  color: rgb(137, 197, 183, 0.8);
}
</style>
