<template>
  <!-- <div>
        <div style="display: block; align-items: center; text-align: center">
          <label>识别结果: {{ result }}</label>
        </div>
        <div
          style="
            display: block;
            align-items: center;
            text-align: center;
            margin: 20px 0 20px 0;
          "
        >
          <label>识别结果2: {{ result2 }}</label>
        </div>
      </div> -->
  <div>
    <img
      class="micro"
      src="../../assets/microphone.svg"
      alt=""
      @click="speakClick"
    />
    <a-button class="stop-btn" type="danger" ghost v-show="flag" @click="speakEndClick">
    <!-- <a-button class="stop-btn" type="danger" ghost @click="speakEndClick"> -->
      停止录音
    </a-button>
  </div>
</template>

<script>
// import { defineEmits } from 'vue';
import { HZRecorder } from "./HZRecorder";
import { message } from "ant-design-vue";
let key = "正在语音识别中……";
// const emit = defineEmits(['sendRecord'])
export default {
  name: "home",
  data() {
    return {
      recorder: "",
      recognition: "",
      result: "",
      result2: "",
      flag: false, //flag为false时 结束录音不显示
    };
  },
  created() {
    const vue = this;
    if (
      navigator.mediaDevices.getUserMedia ||
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia
    ) {
      this.getUserMedia({ video: false, audio: true }); // 调用用户媒体设备，访问摄像头、录音
    } else {
      console.log("你的浏览器不支持访问用户媒体设备");
    }
  },
  methods: {
    speakClick() {
      const vue = this;
      vue.result2 = "";
      vue.result = "";
      console.log("start识别");
      //弹出框
      message.loading({ content: "正在录音中...", key });
      this.flag = true;
      let SpeechRecognition =
        window.SpeechRecognition ||
        window.mozSpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.msSpeechRecognition ||
        window.oSpeechRecognition;
      if (SpeechRecognition) {
        vue.recognition = new SpeechRecognition();
        vue.recognition.continuous = true;
        vue.recognition.interimResults = true;
        vue.recognition.lang = "cmn-Hans-CN"; // 普通话 (中国大陆)
      }
      vue.recognition.start();
      vue.recognition.onstart = function () {
        console.log("识别开始...");
      };
      // eslint-disable-next-line one-var
      let final_transcript = "",
        interim_transcript = "";
      vue.recognition.onerror = function (event) {
        console.log("识别出错");
        message.success({ content: "识别出错", key, duration: 2 });
        this.flag = false;
        console.log(event);
        if (event.error == "no-speech") {
          console.log("no-speech");
        }
        if (event.error == "audio-capture") {
          console.log("audio-capture");
        }
        if (event.error == "not-allowed") {
          console.log("not-allowed");
        }
      };
      vue.recognition.onresult = function (event) {
        console.log("识别成功");
        if (typeof event.results == "undefined") {
          console.log("识别结果undefined");
          vue.recognition.onend = null;
          vue.recognition.stop();
        } else {
          console.log(event.results);
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            } else {
              interim_transcript += event.results[i][0].transcript;
            }
          }
          final_transcript = capitalize(final_transcript);
          console.log("final_transcript: " + final_transcript);
          console.log("interim_transcript: " + interim_transcript);
          if (final_transcript != "undefined") {
            vue.result = final_transcript;
          }
          if (interim_transcript != "undefined") {
            vue.result2 = interim_transcript;
          }
          vue.$emit("sendRecord", vue.result);
        }
      };
      var two_line = /\n\n/g;
      var one_line = /\n/g;
      function linebreak(s) {
        return s.replace(two_line, "<p></p>").replace(one_line, "<br>");
      }
      let first_char = /\S/;
      function capitalize(s) {
        return s.replace(first_char, function (m) {
          return m.toUpperCase();
        });
      }
    },
    speakEndClick() {
      const vue = this;
      console.log("end识别");
      message.success({ content: "结束录音", key, duration: 1 });
      this.flag = false;
      vue.recognition.stop(); // 识别停止
      vue.recognition.onend = function () {
        console.log("识别结束");
      };
    },
    getUserMedia(constrains) {
      let that = this;
      if (navigator.mediaDevices.getUserMedia) {
        // 最新标准API
        navigator.mediaDevices
          .getUserMedia(constrains)
          .then((stream) => {
            that.success(stream);
            that.recorder = new HZRecorder(stream);
            console.log("录音初始化准备完成");
          })
          .catch((err) => {
            that.error(err);
          });
      } else if (navigator.webkitGetUserMedia) {
        // webkit内核浏览器
        navigator
          .webkitGetUserMedia(constrains)
          .then((stream) => {
            that.success(stream);
            that.recorder = new HZRecorder(stream);
            console.log("录音初始化准备完成");
          })
          .catch((err) => {
            that.error(err);
          });
      } else if (navigator.mozGetUserMedia) {
        // Firefox浏览器
        navigator
          .mozGetUserMedia(constrains)
          .then((stream) => {
            that.success(stream);
            that.recorder = new HZRecorder(stream);
            console.log("录音初始化准备完成");
          })
          .catch((err) => {
            that.error(err);
          });
      } else if (navigator.getUserMedia) {
        // 旧版API
        navigator
          .getUserMedia(constrains)
          .then((stream) => {
            that.success(stream);
            that.recorder = new HZRecorder(stream);
            console.log("录音初始化准备完成");
          })
          .catch((err) => {
            that.error(err);
          });
      }
    },
    // 成功的回调函数
    success(stream) {
      console.log("已点击允许,开启成功");
    },
    // 异常的回调函数
    error(error) {
      console.log("访问用户媒体设备失败：", error.name, error.message);
    },
  },
};
</script>

<style scoped>
.micro {
  float: left;
  width: 1.5vw;
  margin-top: 0.3rem;
}
.stop-btn {
  float: right;
}
</style>